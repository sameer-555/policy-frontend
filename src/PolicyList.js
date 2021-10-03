import "./styles.css";
import axios from "axios";
import { useState, useEffect } from "react";
import Pagination from "./Pagination";
import Policy from "./Policy";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import Charts from "./Chart";
import "react-toastify/dist/ReactToastify.css";

export default function PolicyList() {
  const [policyData, setPolicyData] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [recordsPerPage] = useState(30);
  const [activePage, setActivePage] = useState(1);
  const [policySearch, setPolicySearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [noRecord, setNoRecord] = useState("");
  const [policySearchData, setPolicySearchData] = useState({
    policy: "",
    customer: ""
  });
  const [customerSearch, setCustomerSearch] = useState("");

  useEffect(() => {
    const api = async () => {
      setLoading(true);
      let response = await axios.get(process.env.REACT_API_CALL, {
        params: {
          pageNo: activePage,
          policyID: policySearch,
          customerID: customerSearch
        }
      });
      const tempPolicyData = [];
      response.data.data.forEach((policy) => tempPolicyData.push(policy));
      setPolicyData(tempPolicyData);
      setTotalRecords(response.data.count);
      setLoading(false);
      if (response.data.count === 0) {
        setNoRecord("No Record Found");
      } else {
        setNoRecord("");
      }
    };
    api();
  }, [activePage, policySearch, customerSearch]);

  const paginate = (number) => {
    setPolicyData([]);
    setActivePage(number);
  };

  const onSearch = (policy, customer_id) => {
    setActivePage(1);
    setPolicySearch(policy);
    setCustomerSearch(customer_id);
  };

  const handleOnSearch = (e) => {
    let tempSearchVal = { ...policySearchData };
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      tempSearchVal[e.target.name] = e.target.value;
      setPolicySearchData(tempSearchVal);
    }
  };

  return (
    <div>
      <Link to="/chart">Charts</Link>
      <div className="search-container">
        <input
          id="policy-search"
          placeholder="Policy"
          name="policy"
          value={policySearchData.policy}
          onChange={(e) => handleOnSearch(e)}
        />
        <input
          id="customer-id-search"
          placeholder="Customer ID"
          name="customer"
          value={policySearchData.customer}
          onChange={(e) => handleOnSearch(e)}
        />
        <button
          type="submit"
          className="button"
          onClick={() =>
            onSearch(
              document.getElementById("policy-search").value,
              document.getElementById("customer-id-search").value
            )
          }
        >
          Search
        </button>
      </div>
      <div className="tbl-header">
        <table cellPadding="0" cellSpacing="0" border="0">
          <thead>
            <tr>
              <th>Policy ID</th>
              <th>Customer ID</th>
              <th>Premium</th>
              <th>Customer Region</th>
              <th>Date of Purchase</th>
              <th>Customer Income Group </th>
              <th>Fuel Type</th>
            </tr>
          </thead>
        </table>
      </div>
      {!loading ? (
        <>
          <div className="tbl-content">
            <table cellPadding="0" cellSpacing="0" border="0">
              <tbody>
                {policyData.map((element) => (
                  <Policy props={element} key={element._id.$oid} />
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <Loading />
      )}
      <div>{noRecord}</div>
      <Pagination
        policyPerPage={recordsPerPage}
        totalPolicy={totalRecords}
        paginate={paginate}
      />
    </div>
  );
}

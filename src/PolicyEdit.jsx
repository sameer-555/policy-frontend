import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import axios from "axios";

const PolicyEdit = (props) => {
  const [policyObjId] = useState(props.match.params.slug);
  const [form, setForm] = useState({
    policy_id: "",
    date_of_purchase: "",
    customer_id: "",
    fuel: "",
    vehicle_segment: "",
    premium: 0,
    bodily_injury_liability: 0,
    personal_injury_protection: 0,
    collision: 0,
    comprehensive: 0,
    customer_gender: "",
    customer_income_group: "",
    customer_region: "",
    customer_marital_status: 0
  });
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const api = async () => {
      let res = await axios.get(
        `https://bcg-backend.herokuapp.com/api/single`,
        {
          params: {
            objID: policyObjId
          }
        }
      );
      setLoading(false);
      setForm({
        policy_id: res.data.policy_id,
        date_of_purchase: res.data.date_of_purchase,
        customer_id: res.data.customer_id,
        fuel: res.data.fuel,
        vehicle_segment: res.data.vehicle_segment,
        premium: res.data.premium,
        bodily_injury_liability: res.data.bodily_injury_liability,
        personal_injury_protection: res.data.personal_injury_protection,
        collision: res.data.collision,
        comprehensive: res.data.comprehensive,
        customer_gender: res.data.customer_gender,
        customer_income_group: res.data.customer_income_group,
        customer_region: res.data.customer_region,
        customer_marital_status: res.data.customer_marital_status
      });
    };

    api();
  }, [policyObjId]);

  const handleSubmit = async () => {
    setLoading(true);
    let updateForm = Object.assign({}, form);
    updateForm["_id"] = policyObjId;
    let res = await axios.post("https://BCG-Task.sameer555.repl.co/update", {
      body: updateForm
    });
    if (res) {
      setLoading(false);
      toast.success(`Updated Successfully!`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
    }
  };

  const handleChange = (event, fieldName) => {
    const tempForm = { ...form };
    tempForm[event.target.name] = event.target.value;
    if (event.target.name === "premium" && event.target.value > 1000000) {
      alert("Premium value cannot be greater than million.");
      return;
    }
    setForm(tempForm);
    toast.success(`${fieldName} is Updated`, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });
  };

  return (
    <>
      <Link to="/">Home</Link>
      {!loading ? (
        <>
          <form className="policy-form">
            <div className="form-first-column">
              <label>Policy ID:</label>
              <input
                type="text"
                value={form.policy_id}
                name="policy_id"
                readOnly="readonly"
                onChange={(e) => handleChange(e, "Policy Id")}
              />

              <label>Date of Purchase:</label>
              <input
                type="text"
                value={form.date_of_purchase}
                name="date_of_purchase"
                readOnly="readonly"
                onChange={(e) => handleChange(e, "Date of Purchase")}
              />

              <label>Customer ID:</label>
              <input
                type="text"
                value={form.customer_id}
                name="customer_id"
                readOnly="readonly"
                onChange={(e) => handleChange(e, "Customer Id")}
              />

              <label>Fuel:</label>
              <select
                name="fuel"
                value={form.fuel}
                onChange={(e) => handleChange(e, "Fuel")}
              >
                <option value="CNG">CNG</option>
                <option value="Diesel">Diesel</option>
                <option value="Petrol">Petrol</option>
              </select>
              <label>Vehicle Segment:</label>
              <select
                value={form.vehicle_segment}
                name="vehicle_segment"
                onChange={(e) => handleChange(e, "Vehicle Segment")}
              >
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
              </select>
            </div>
            <div className="form-second-column">
              <label>Premium:</label>
              <input
                type="number"
                value={form.premium}
                name="premium"
                onChange={(e) => handleChange(e, "Premium")}
              />

              <label>Bodily Injury Liability:</label>
              <select
                value={form.bodily_injury_liability}
                name="bodily_injury_liability"
                onChange={(e) => handleChange(e, "Bodily Injury Liability")}
              >
                <option value="1">1</option>
                <option value="0">0</option>
              </select>

              <label>Personal Injury Protection:</label>
              <select
                value={form.personal_injury_protection}
                name="personal_injury_protection"
                onChange={(e) => handleChange(e, "Personal Injury Protection")}
              >
                <option value="1">1</option>
                <option value="0">0</option>
              </select>

              <label>Collision:</label>
              <select
                value={form.collision}
                name="collision"
                onChange={(e) => handleChange(e, "Collision")}
              >
                <option value="1">1</option>
                <option value="0">0</option>
              </select>

              <label>Comprehensive:</label>
              <select
                value={form.comprehensive}
                name="comprehensive"
                onChange={(e) => handleChange(e, "Comprehensive")}
              >
                <option value="1">1</option>
                <option value="0">0</option>
              </select>
            </div>
            <div className="form-third-column">
              <label>Customer Gender:</label>
              <select
                value={form.customer_gender}
                name="customer_gender"
                onChange={(e) => handleChange(e, "Customer Gender")}
              >
                <option value="Female">Female</option>
                <option value="Male">Male</option>
              </select>

              <label>Customer Income Group: </label>
              <select
                value={form.customer_income_group}
                name="customer_income_group"
                onChange={(e) => handleChange(e, "Customer Income Group")}
              >
                <option value="0- $25K">0- $25K</option>
                <option value="$25-$70K">$25-$70K</option>
                <option value=">$70K">{">"}$70K</option>
              </select>

              <label>Customer Region:</label>
              <select
                value={form.customer_region}
                name="customer_region"
                onChange={(e) => handleChange(e, "Customer Region")}
              >
                <option value="East">East</option>
                <option value="West">West</option>
                <option value="North">North</option>
                <option value="South">South</option>
              </select>

              <label>Customer Marital Status:</label>
              <select
                value={form.customer_marital_status}
                name="customer_marital_status"
                onChange={(e) => handleChange(e, "Customer Marital Status")}
              >
                <option value="1">1</option>
                <option value="0">0</option>
              </select>
            </div>
          </form>
          <button class="submit-button" onClick={(e) => handleSubmit(e)}>
            Submit
          </button>
        </>
      ) : (
        <Loading />
      )}
      <ToastContainer />
    </>
  );
};

export default PolicyEdit;

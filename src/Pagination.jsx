import "./styles.css";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Pagination = ({ policyPerPage, totalPolicy, paginate }) => {
  const pageNumber = [];
  const [currentActivePage, setCurrentActivePage] = useState(1);
  for (let i = 1; i <= Math.ceil(totalPolicy / policyPerPage); i++) {
    pageNumber.push(i);
  }

  const paginationClick = (number) => {
    if (pageNumber.length < number || number === 0) {
      toast.error("This is the last page", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
      return;
    }
    paginate(number);
    setCurrentActivePage(number);
  };

  return (
    <>
      {pageNumber.length > 0 ? (
        <div className="pagination">
          <div onClick={() => paginationClick(currentActivePage - 1)}>
            &laquo;
          </div>
          {pageNumber.map((number) => (
            <div
              key={number}
              onClick={() => paginationClick(number)}
              className={currentActivePage === number ? "active" : ""}
            >
              {number}
            </div>
          ))}
          <div onClick={() => paginationClick(currentActivePage + 1)}>
            &raquo;
          </div>
          <ToastContainer />
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default Pagination;

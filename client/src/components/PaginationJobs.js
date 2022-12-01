import React from "react";
import { AiOutlineDoubleRight, AiOutlineDoubleLeft } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { setChangePage } from "../features/AllJobsSlice";

const PaginationJobs = ({ numOfPages, page }) => {
  const dispatch = useDispatch();
  const number = Array.from({ length: numOfPages }, (x, i) => {
    return i + 1;
  });

  const nextPage = () => {
    if (page < numOfPages) {
      page += 1
      dispatch(setChangePage(page))
    } else {
      return page
    }
  }

  const prevPage = () => {
    if (page <= 1) {
      page = 1
      dispatch(setChangePage(page))
    } else {
      page -= 1
      dispatch(setChangePage(page))
    }
  }

  return (
    <div>
      <div className="d-flex justify-content-end align-items-center">
        <button className="btn-controller" onClick={() => prevPage()}>
          <AiOutlineDoubleLeft /> Prev
        </button>
        <div className="btn-container">
          {number.map((pageNum) => {
            return (
              <button
                className={pageNum === page ? "active" : ""}
                key={pageNum}
                name="page"
                onClick={(e) => dispatch(setChangePage(pageNum))}
              >
                {pageNum}
              </button>
            );
          })}
        </div>
        <button className="btn-controller" onClick={() => nextPage()}>
          Next <AiOutlineDoubleRight />
        </button>
      </div>
    </div>
  );
};

export default PaginationJobs;

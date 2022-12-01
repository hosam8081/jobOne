import React, { useEffect } from "react";
import { Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getJobs } from "../features/AllJobsSlice";
import Job from "./Job";
import jwtDecode from "jwt-decode";
import Loading from "./Loading";
import PaginationJobs from "./PaginationJobs";
const JobsContainer = () => {
  const {jobs, loading, filter, numOfPages, totalJobs, page} = useSelector(state => state.allJobs)
  const {sort, search, status, type } = filter
  const dispatch = useDispatch();

  const token = JSON.parse(localStorage.getItem("user")).token
  const decode = jwtDecode(token)



  useEffect(() => {
    dispatch(getJobs());
  }, [dispatch, sort, search, status, type, page]);
  
  if (loading) {
    return <Loading />
  }
  return (
    <>
      <h5 className="mt-5 mb-3">Jobs Find {totalJobs} </h5>
      <Row>
        {jobs?.map(job => {
          return <Job key={job._id} {...job} userID={decode.userID}/>
        })}
      </Row>
      {numOfPages > 1 && <PaginationJobs numOfPages={numOfPages} page={page}/>}
      
    </>
  );
};

export default JobsContainer;

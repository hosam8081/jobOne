import React from "react";
import { Col } from "react-bootstrap";
import { FaLocationArrow } from "react-icons/fa";
import { BsCalendarDate } from "react-icons/bs";
import { MdWorkOutline } from "react-icons/md";
import moment from "moment";
import { useDispatch } from "react-redux";
import { deleteJob, setIsEdit } from "../features/jobSlice";
import { useNavigate } from "react-router-dom";
const Job = ({
  _id: id,
  company,
  status,
  createdAt,
  createdBy,
  position,
  userID,
  type,
  location
}) => {
  const dispatch = useDispatch();
  const date = moment(createdAt).format("MMMM Do YYYY");
  const navigate = useNavigate()

  // change IsEdit to id  
  const updateIsEdit = (id) => {
    dispatch(setIsEdit({id:id, data:{position, company, location, status, type}}))
    navigate('/addjob')
  }
  return (
    <Col md={6} className="mb-4">
      <div className="border p-4 bg-white rounded">
        <div className="d-flex align-items-start ">
          <div
            className="text-capitalize me-3 rounded"
            style={{
              background: "#3b82f6",
              color: "#fff",
              fontSize:'25px',
              padding: "10px 20px",
            }}
          >
            {company[0]}
          </div>
          <div>
            <h5 className="">{position}</h5>
            <p>{company}</p>
          </div>
        </div>
        <div className="border border-light"></div>
        <div className="d-flex justify-content-between my-3">
          <div>
            <FaLocationArrow />
            <span className="ms-3">{location}</span>
          </div>
          <div>
            <BsCalendarDate />
            <span className="ms-3">{date}</span>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between my-3 mb-4">
          <div>
            <MdWorkOutline />
            <span className="ms-3">{type}</span>
          </div>
          <div className="bg-warning  py-1 px-3 rounded">{status}</div>
        </div>
        {userID === createdBy ? (
          <>
            <button className="btn btn-primary me-2" onClick={() => updateIsEdit(id)}>edit</button>
            <button className="btn btn-danger me-2" onClick={() => dispatch(deleteJob(id))}>Delete</button>
          </>
        ) : (
          ""
        )}
      </div>
    </Col>
  );
};

export default Job;

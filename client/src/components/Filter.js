import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { clearFilter, setFilter } from "../features/AllJobsSlice";
import { useDispatch, useSelector } from "react-redux";
const Filter = () => {
  const {search, sort, type, status} = useSelector(state => state.allJobs.filter)
  const dispatch = useDispatch();
  const handleFilter = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(setFilter({ name, value }));
  };
  return (
    <div className="filter my-3">
      <div className="p-4 border rounded card shadow">
        <h3 className="heading">search Form</h3>
        <Row>
          <Col sm={4}>
            <label htmlFor="search">Search</label>
            <br />
            <input
              type="text"
              className="filter-input"
              placeholder="position"
              value={search}
              name="search"
              onChange={handleFilter}
            />
          </Col>
          <Col sm={4}>
            <label htmlFor="status">status</label>
            <br />
            <select
              name="status"
              id=""
              value={status}
              className="filter-input"
              onChange={handleFilter}
            >
              <option value="all">all</option>
              <option value="pending">pending</option>
              <option value="interview">interview</option>
              <option value="declined">declined</option>
            </select>
          </Col>
          <Col sm={4}>
            <label htmlFor="type">type</label>
            <br />
            <select
              name="type"
              id=""
              value={type}
              className="filter-input"
              onChange={handleFilter}
            >
              <option value="full-time">full-time</option>
              <option value="part-time">part-time</option>
              <option value="internship">internship</option>
              <option value="remote">remote</option>
            </select>
          </Col>
        </Row>
        <Row className="align-items-center mt-4">
          <Col sm={4}>
            <label htmlFor="search">sort</label>
            <br />
            <select
              name="sort"
              className="filter-input"
              value={sort}
              onChange={handleFilter}
            >
              <option value="latest">latest</option>
              <option value="oldest">oldest</option>
              <option value="a-z">a-z</option>
              <option value="z-a">z-a</option>
            </select>
          </Col>
          <Col sm={4}>
            <Button variant="danger" className="me-2 mt-4" onClick={() => dispatch(clearFilter()) }>
              clear filters
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Filter;

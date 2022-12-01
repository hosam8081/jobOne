import React from "react";
import { Row, Col, Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Layout } from "../components";
import { clearValues, postJob, setValues, updateJob} from "../features/jobSlice";

const AddJob = () => {
  const {data, isEdit}  = useSelector(state => state.job)
  const {position, company, location, status, type}  = data;

  const dispatch = useDispatch();
  
  // change inputs values
  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    dispatch(setValues({name, value}))
  };

  const postData = (e) => {
    e.preventDefault()

    // check for if no values
    if (!data.position || !data.company || !data.location) {
      toast.error('provide positoin, company and location')
      return 
    }
    // check for edit and update
    if (isEdit) {
      dispatch(updateJob(isEdit))
      return 
    }

    dispatch(postJob())
  }

  return (
    <Layout>
      <Container>
        <div className="filter my-3">
          <div className="p-4 border rounded card shadow">
            <h3 className="heading">{isEdit ? "edit job" : "add job"}</h3>
            <form action="" onSubmit={postData}>
              <Row>
                <Col sm={4}>
                  <label htmlFor="position">position</label>
                  <br />
                  <input
                    type="text"
                    className="filter-input"
                    placeholder="position"
                    name="position"
                    value={position}
                    onChange={handleChange}
                  />
                </Col>
                <Col sm={4}>
                  <label htmlFor="company">company</label>
                  <br />
                  <input
                    type="text"
                    className="filter-input"
                    placeholder="company"
                    name="company"
                    value={company}
                    onChange={handleChange}
                  />
                </Col>
                <Col sm={4}>
                  <label htmlFor="location">location</label>
                  <br />
                  <input
                    type="text"
                    className="filter-input"
                    name="location"
                    placeholder="location"
                    value={location}
                    onChange={handleChange}
                  />
                </Col>
              </Row>
              <Row className="align-items-center mt-4">
                <Col sm={4}>
                  <label htmlFor="search">status</label>
                  <br />
                  <select
                    name="status"
                    id=""
                    className="filter-input"
                    value={status}
                    onChange={handleChange}
                  >
                    <option value="pending">pending</option>
                    <option value="interview">interview</option>
                    <option value="declined">declined</option>
                  </select>
                </Col>
                <Col sm={4}>
                  <label htmlFor="search">job type</label>
                  <br />
                  <select
                    name="type"
                    id=""
                    className="filter-input"
                    value={type}
                    onChange={handleChange}
                  >
                    <option value="full-time">full-time</option>
                    <option value="part-time">part-time</option>
                    <option value="remote">remote</option>
                    <option value="internship">internship</option>
                  </select>
                </Col>
                <Col>
                  <Button variant="primary" className="me-2 mt-4" onClick={() => dispatch(clearValues())}>
                    clear
                  </Button>
                  <Button variant="success" className="me-2 mt-4" type="submit">
                    {isEdit ? "edit" : "submit"}
                  </Button>
                </Col>
              </Row>
            </form>
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default AddJob;

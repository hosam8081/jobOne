import React, { useState } from "react";
import { Layout } from "../components";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../features/userSlice";
const Profile = () => {
  const {user} = useSelector(state => state.user)
  const [values, setValues] = useState({
    name:user.name,
    lastName:user.lastName,
    email:user.email,
    location:user.location
  });
  const dispatch = useDispatch()
  const changeProfile = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
  };

  const onUpdate = (e) => {
    e.preventDefault()
    dispatch(updateUser(values))
  }
  return (
    <Layout>
      <Container>
        <div className="filter my-3">
          <div className="p-4 border rounded card shadow">
            <h3 className="heading">Profile</h3>
            <form onSubmit={onUpdate}>
              <Row>
                <Col sm={4}>
                  <label htmlFor="name">name</label>
                  <br />
                  <input
                    type="text"
                    className="filter-input"
                    placeholder="name"
                    name="name"
                    value={user.name}
                    onChange={changeProfile}
                  />
                </Col>
                <Col sm={4}>
                  <label htmlFor="last Name">last Name</label>
                  <br />
                  <input
                    type="text"
                    className="filter-input"
                    placeholder="last name"
                    value={user.lastName}
                    name="lastName"
                    onChange={changeProfile}
                  />
                </Col>
                <Col sm={4}>
                  <label htmlFor="email">email</label>
                  <br />
                  <input
                    type="email"
                    className="filter-input"
                    placeholder="email"
                    value={user.email}
                    name="email"
                    onChange={changeProfile}
                  />
                </Col>
              </Row>
              <Row className="align-items-center mt-4">
                <Col sm={4}>
                  <label htmlFor="location">location</label>
                  <br />
                  <input
                    type="text"
                    className="filter-input"
                    placeholder="location"
                    value={user.location}
                    name="location"
                    onChange={changeProfile}
                  />
                </Col>
                <Col>
                  <Button variant="primary px-5" className="me-2 mt-4" type="submit">
                    save changes
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

export default Profile;

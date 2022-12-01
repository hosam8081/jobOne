import React from "react";
import { Navbar, Container, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut, setOpenSide } from "../features/userSlice";
import {FaBars} from 'react-icons/fa'
const Header = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch()
  const onLogOut = () => {
    dispatch(logOut())
  }
  return (
    <>
      <Navbar>
        <Container>
          <div className="d-flex align-items-center">
          <Link to="/" className="navbar-brand">
            jobOne
          </Link>
          <button className="btn btn-toggle d-block d-md-none" onClick={() => dispatch(setOpenSide())}><FaBars /></button>
          </div>
          {user ? (
            <Dropdown>
              <Dropdown.Toggle variant="primary" id="dropdown-basic">
                {user.name}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => onLogOut()}>LogOut</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <div>
              <Link to="/login" className="btn btn-primary">
                login
              </Link>
              <Link to="/register" className="btn btn-warning ms-2">
                register
              </Link>
            </div>
          )}
        </Container>
      </Navbar>
    </>
  );
};

export default Header;

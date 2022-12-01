import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { MdWork } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerUser } from "../features/userSlice";

const Register = () => {
  const { loading, user } = useSelector((state) => state.user);
  const [values, setValues] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // change input values
  const changeValues = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  // send data to api
  const sendData = (e) => {
    e.preventDefault();
    let { name, email, password } = values;
    if (!name || !email || !password) {
      toast.error("Please fill out all fields");
      return;
    }
    if (password.length < 10) {
      toast.error("passowrd should be bigger than ten");
      return;
    }
    dispatch(registerUser(values));
  };

  useEffect(() => {
    if(user) {
      setTimeout(() => {
        navigate("/")
      }, 2000)
    }
  })
  return (
    <>
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="px-5 py-4 shadow">
          <div className="text-center">
            <div className="logo mt-3 mb-3">
              <MdWork />
            </div>
            <h3 className="heading">Register</h3>
          </div>
          <form onSubmit={(e) => sendData(e)}>
            <div className="d-flex flex-column mt-5">
              <label htmlFor="name" className="mb-2">
                name
              </label>
              <input
                type="name"
                name="name"
                placeholder="name"
                onChange={changeValues}
              />
            </div>
            <div className="d-flex flex-column my-3">
              <label htmlFor="email" className="mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="email"
                onChange={changeValues}
              />
            </div>
            <div className="d-flex flex-column mt-3">
              <label htmlFor="password" className="mb-2">
                password
              </label>
              <input
                type="password"
                name="password"
                placeholder="password"
                onChange={changeValues}
              />
            </div>
            <Button variant="primary mt-5 mb-3" className="w-100" disabled={loading} type="submit">
              {loading ? "...loading" : "submit"}
            </Button>
          </form>
          <p>
            Not a member yet? {""}
            <Link to="/login">login</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;

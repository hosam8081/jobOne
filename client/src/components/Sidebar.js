import React from "react";
import { Link } from "react-router-dom";
import { ImStatsDots } from "react-icons/im";
import { AiOutlineFolderAdd, AiOutlineUser, AiFillHome } from "react-icons/ai";
import { MdWork } from "react-icons/md";
import {AiOutlineClose} from 'react-icons/ai'
import { setCloseSide } from "../features/userSlice";
import { useDispatch } from "react-redux";
const Sidebar = () => {
  const dispatch = useDispatch()
  return (
    <div className="pt-3 text-center">
      <Link to="/" className="logo">
        <MdWork />
      </Link>
      <button className="side-close d-md-none d-inline-flex" onClick={() => dispatch(setCloseSide())}><AiOutlineClose /></button>
      <div className="d-flex flex-column justify-content-center">
        <ul>
          <li className="side-link pt-5" onClick={() => dispatch(setCloseSide())}>
            <Link to="/">
              <AiFillHome />
            </Link>
          </li>
          <li className="side-link pt-5"  onClick={() => dispatch(setCloseSide())}>
            <Link to="/addjob">
              <AiOutlineFolderAdd />
            </Link>
          </li>
          <li className="side-link pt-5" onClick={() => dispatch(setCloseSide())}>
            <Link to="/profile">
              <AiOutlineUser />
            </Link>
          </li>
          <li className="side-link pt-5" onClick={() => dispatch(setCloseSide())}>
            <Link to="/stats">
              <ImStatsDots />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;

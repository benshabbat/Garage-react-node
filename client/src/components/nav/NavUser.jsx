import "./nav.css";
import React from "react";
import { Link } from "react-router-dom";
const NavUser = () => {
  return (
    <>
      <div className="item-nav">
        <Link to={`/services/user`}>Services</Link>
      </div>
      <div className="item-nav">
        <Link to={`/account`}>Account</Link>
      </div>
    </>
  );
};

export default NavUser;

import React from "react";
import { Link } from "react-router-dom";
const NavAdmin = () => {
  return (
    <>
      <div className="item-nav">
        <Link to={`/users`}>Users</Link>
      </div>
      <div className="item-nav">
        <Link to={`/cars`}>Cars</Link>
      </div>
      <div className="item-nav">
        <Link to={`/services`}>Services</Link>
      </div>
    </>
  );
};

export default NavAdmin;

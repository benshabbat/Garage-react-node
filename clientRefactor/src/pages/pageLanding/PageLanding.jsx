import "./pageLanding.css";
import React from "react";
import Home from "../home/Home";
import {
  Reviews,
  Address,
  About,
  ServicesLanding,
  Contact,
} from "../../components";

const PageLanding = () => {
  return (
    <div className="main">
      <Home />
      <About />
      <ServicesLanding />
      <div className="address_and_contact">
        {/* <Address /> */}
        <Contact />
      </div>
      <Reviews />
      <footer>Written By Menachem & DavidChen</footer>
    </div>
  );
};

export default PageLanding;

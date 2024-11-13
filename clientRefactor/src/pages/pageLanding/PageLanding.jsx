import "./pageLanding.css";
import React from "react";
import Home from "../home/Home";
import {
  Reviews,
  // Address,
  About,
  ServicesLanding,
  Contact,
} from "../../components";
import GarageHomepage from "../../components/landing/codeOfClaude/GarageHomePage";

const PageLanding = () => {
  return (
    <div className="main">
      <GarageHomepage/>
      {/* <Home /> */}
      {/* <About /> */}
      {/* <ServicesLanding /> */}
      {/* <div className="address_and_contact"> */}
        {/* <Address /> */}
        {/* <Contact /> */}
      {/* </div> */}
      <Reviews />
      <footer>Written By David-Chen Benshabbat</footer>
    </div>
  );
};

export default PageLanding;

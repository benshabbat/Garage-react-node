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
import Carousel from "../../components/landing/reviews/Carousel";

const PageLanding = () => {
  return (
    <div className="main">
      <Carousel/>
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

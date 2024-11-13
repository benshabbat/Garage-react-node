import React from "react";
import classes from "./ServicesLanding.module.css";

const ServicesLanding = () => {
  return (
    <div className={classes.main} id="services">
      <h1>Our Services</h1>
      <ul>
        <li>Car Air Conditioning</li>
        <li>Car Batteries</li>
        <li>Car Brakes</li>
        <li>Car Exhausts</li>
        <li>Car Gearbox Repairs</li>
        <li>Car Repairs</li>
        <li>Car Servicing</li>
        <li>Car Tyres</li>
        <li>Car Welding</li>
        <li>Classic Car Service</li>
        <li>Clutch Replacement</li>
        <li>Courtesy Car</li>
        <li>Engine Diagnostics</li>
        <li>Fleet Maintenance</li>
        <li>Mechanical Repairs</li>
      </ul>
    </div>
  );
};

export default ServicesLanding;

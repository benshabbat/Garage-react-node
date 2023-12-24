import "./services.css";
import React from "react";
import { useParams } from "react-router-dom";
import Service from "../../components/service/Service";

const Services = ({ user }) => {
  const { carId } = useParams();
  const carFilter = user?.cars?.filter((car) => car._id === carId);
  const carService = (car) => {
    return (
      <div key={car?._id}>
        <h2 className="title">{car?.numberPlate}</h2>
        <Service carServices={car?.services} />
      </div>
    );
  };
  return (
    <>
      <h1 className="h-title">{`hello ${user?.username}`}</h1>
      {carId && carFilter
        ? carFilter?.map(carService)
        : user?.cars?.map(carService)}
    </>
  );
};

export default Services;

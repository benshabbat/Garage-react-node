import "./account.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReqService from "../../components/create/ReqService";
import useOpenModel from "../../hooks/useOpenModel";
import { useSelector } from "react-redux";
const Account = () => {
  const { user } = useSelector((state) => state.user);
  const [car, setCar] = useState();
  const [handleReqService, isOpenReqService] = useOpenModel();
  const [filterCars, setFilterCars] = useState();
  const navigate = useNavigate();
  const handelCar = (e) => {
    const { value } = e.target;
    console.log(e.target.value);
    setCar(user?.cars.find((c) => c._id === value));
    handleReqService();
  };


  const onServices = (e) => {
    const { value } = e.target;
    console.log(e.target.value);
    navigate(`/services/car/${value}`);
  };

  const filterSearch = (e) => {
    const { value } = e.target;
    setFilterCars(
      user?.cars?.filter(
        (item) =>
          item.numberPlate.includes(value) ||
          item.km.toString().includes(value) ||
          item.brand.includes(value)
      )
    );
  };
  const bodyAcc =(car)=>{
    return(
      <tr key={car._id}>
      <td>{car.brand}</td>
      <td>{car.numberPlate}</td>
      <td>{car.km}</td>
      <td>
        <button value={car._id} onClick={onServices}>
          services
        </button>
      </td>
      <td>
        <button value={car._id} onClick={handelCar}>
          req services
        </button>
      </td>
    </tr>
    )

  }
  return (
    <>
      {" "}
      <div className="table-container">
        <section className="table__header">
          <h1>My Cars</h1>
          <div className="input-group">
            <input
              type="search"
              placeholder="Search Data..."
              onChange={filterSearch}
            />
          </div>
        </section>
        <section className="table__body">
          <table>
            <thead>
              <tr>
                <th>brand</th>
                <th>numberPlate</th>
                <th>km</th>
                <th>history service</th>
                <th>Request Service</th>
              </tr>
            </thead>
            <tbody>
              {filterCars ? filterCars?.map(bodyAcc) :user?.cars?.map((bodyAcc))}
            </tbody>
          </table>
        </section>
      </div>
      {
        <ReqService
          car={car}
          handelClick={handleReqService}
          isOpen={isOpenReqService}
          user={user}
        />
      }
    </>
  );
};

export default Account;

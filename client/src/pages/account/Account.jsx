import "./account.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReqService from "../../components/create/ReqService";
import useOpenModel from "../../hooks/useOpenModel";
import { useDispatch } from "react-redux";
import {
  getCarsByIdUser,
  getMessagesByIdUser,
} from "../../features/user/userSlice";
const Account = ({ user }) => {
  const [car, setCar] = useState();
  const [handleReqService, isOpenReqService] = useOpenModel();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCarsByIdUser(user?._id));
    dispatch(getMessagesByIdUser(user?._id));
  }, []);
  const handelCar = (e) => {
    const { value } = e.target;
    console.log(e.target.value);
    setCar(user?.cars.find((c) => c._id === value));
    handleReqService();
  };

  const navigate = useNavigate();

  const onServices = (e) => {
    const { value } = e.target;
    console.log(e.target.value);
    // setCar(user?.cars.find((c) => c._id === value));
    navigate(`/services/car/${value}`);
  };
  return (
    <>
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
            {user?.cars?.[0]?._id &&
              user?.cars?.map((car) => {
                return (
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
                );
              })}
          </tbody>
        </table>
      </section>

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

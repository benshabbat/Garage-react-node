import React from "react";
import { OpenModel } from "../index";
import { deleteCar } from "../../Utils";

import CancelIcon from "@mui/icons-material/Cancel";
const DeleteCar = ({
  handelClick: handelClickManage = null,
  isOpen,
  car = null,
}) => {
  const handleCar = async (e) => {
    e.preventDefault();
    const { name } = e.target;
    if (name === "noDelete") handelClickManage();

    if (name === "deleteCar") {
      await deleteCar(car?._id, car?.owner._id.toString());
      handelClickManage();
    }
  };

  return (
    <OpenModel
      comp={
        <>
          <form className="form">
            <CancelIcon onClick={handelClickManage} className="form-close" />
            <h1 className="header">Manage Admin</h1>
            <h2>{`Hello ${car?.owner?.username}`}</h2>
            <label className="form-label">
              <button name="noDelete" className="create" onClick={handleCar}>
                No
              </button>
            </label>
            <label className="form-label">
              <button name="deleteCar" className="delete" onClick={handleCar}>
                Yes
              </button>
            </label>
          </form>
        </>
      }
      isOpen={isOpen}
    />
  );
};

export default DeleteCar;

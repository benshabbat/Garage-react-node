import "./manage.css";
import React from "react";
import { useDispatch } from "react-redux";
import { getUsers } from "../../features/admin/adminSlice";
import CancelIcon from "@mui/icons-material/Cancel";
import { deleteUser } from "../../Utils";
import useOpenModel from "../../hooks/useOpenModel";
import { CreateCar, OpenModel, EditUser } from "../index";
const ManageUser = ({
  handelClick: handelClickManage = null,
  isOpen,
  user = null,
}) => {
const [handleCreateCar,isOpenModelCreateCar] = useOpenModel();
const [handleEditUser,isOpenModelEditUser] = useOpenModel();

  const dispatch = useDispatch();

  const handleUser = async (e) => {
    e.preventDefault();
    const { name } = e.target;
    if (name === "createCar") handleCreateCar();
    if (name === "deleteUser") {
      await deleteUser(user?._id);
      handelClickManage();
    }
    if (name === "editUser") {
      handleEditUser();
    }
    dispatch(getUsers());
    
  };

  return (
    <OpenModel
      comp={
        <>
          <form className="form">
            <CancelIcon onClick={handelClickManage} className="form-close" />
            <h1 className="header">Manage Admin</h1>
            <h2>{`Hello ${user?.username}`}</h2>
            <label className="form-label">
              <button
                name="createCar"
                className="create"
                onClick={handleUser}
              >
                Create Car
              </button>
            </label>
            <label className="form-label">
              <button
                name="editUser"
                className="edit"
                onClick={handleUser}
              >
                Edit User
              </button>
            </label>
            <label className="form-label">
              <button
                name="deleteUser"
                className="delete"
                onClick={handleUser}
              >
                Delete User
              </button>
            </label>
          </form>
          <CreateCar
            user={user}
            handelClick={handleCreateCar}
            isOpen={isOpenModelCreateCar}
          />
          <EditUser
            user={user}
            handelClick={handleEditUser}
            isOpen={isOpenModelEditUser}
          />
        </>
      }
      isOpen={isOpen}
    />
  );
};

export default ManageUser;

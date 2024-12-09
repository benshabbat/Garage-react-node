import "./manage.css";
import { deleteUser } from "../../utils";
import useOpenModel from "../../hooks/useOpenModel";
import { CreateCar, OpenModel, EditUser } from "../index";

//TODO:USING USECONTEXT BUT NEED TO KNOW TO MOVING WITH PROPS
const ManageUser = ({
  handelClick: handelClickManage = null,
  isOpen,
  user = null,
}) => {
const [handleCreateCar,isOpenModelCreateCar] = useOpenModel();
const [handleEditUser,isOpenModelEditUser] = useOpenModel();


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
    // did problem for external components
    // dispatch(getUsers());
    
  };

  return (
    <OpenModel
      comp={
        <>
          <form className="form">
          <button onClick={handelClickManage} className="form-close" >X</button>
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

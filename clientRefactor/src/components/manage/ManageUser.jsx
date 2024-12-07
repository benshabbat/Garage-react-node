import "./manage.css";
import { CreateCar, OpenModal, EditUser } from "../index";
import { useUsersContext } from "../../pages/users/UsersContext";

//TODO:TO CREATE DELETE USER COMPONENT
const ManageUser = () => {
  const { modals, handleUser, selectedUser } = useUsersContext();
  return (
    <OpenModal
      comp={
        <>
          <form className="form">
            <button onClick={modals.manageUser.handle} className="form-close">
              X
            </button>
            <h1 className="header">Manage Admin</h1>
            <label className="form-label">
              <button
                name="createCar"
                className="create"
                onClick={handleUser}
                value={selectedUser?._id}
              >
                Create Car
              </button>
            </label>
            <label className="form-label">
              <button
                name="editUser"
                className="edit"
                onClick={handleUser}
                value={selectedUser?._id}
              >
                Edit User
              </button>
            </label>
            <label className="form-label">
              <button
                name="deleteUser"
                className="delete"
                onClick={handleUser}
                value={selectedUser?._id}
              >
                Delete User
              </button>
            </label>
          </form>
          <CreateCar />
          <EditUser />
        </>
      }
      isOpen={modals.manageUser.isOpen}
    />
  );
};

export default ManageUser;

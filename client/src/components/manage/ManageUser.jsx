import "./manage.css";
import { CreateCar, OpenModal, EditUser } from "../index";
import { useUsersContext } from "../../pages/users/UsersContext";
import ButtonManage from "./ButtonManage";
import FormManage from "./FormManage";

//TODO:TO CREATE DELETE USER COMPONENT
const ManageUser = () => {
  const { modals, handleUser, selectedUser } = useUsersContext();
  return (
    <OpenModal
      comp={
        <>
          <FormManage handle={modals.manageUser.handle}>
            <ButtonManage
              name="createCar"
              type={"create"}
              handle={handleUser}
              value={selectedUser?._id}
              content={"Create Car"}
            />
            <ButtonManage
              name="editUser"
              type={"edit"}
              handle={handleUser}
              value={selectedUser?._id}
              content={"Edit User"}
            />
            <ButtonManage
              name="deleteUser"
              type={"delete"}
              handle={handleUser}
              value={selectedUser?._id}
              content={"Delete User"}
            />
          </FormManage>
          <CreateCar />
          <EditUser />
        </>
      }
      isOpen={modals.manageUser.isOpen}
    />
  );
};

export default ManageUser;

import "./manage.css";
import { CreateCar, OpenModal, EditUser } from "../index";
import { useUsersContext } from "../../pages/users/UsersContext";
import ButtonManage from "./ButtonManage";
import FormManage from "./FormManage";

const MANAGE_USER_BUTTONS = [
  { name: "createCar",  type: "create", content: "Create Car"  },
  { name: "editUser",   type: "edit",   content: "Edit User"   },
  { name: "deleteUser", type: "delete", content: "Delete User" },
];

const ManageUser = () => {
  const { modals, handleUser, selectedUser } = useUsersContext();
  return (
    <OpenModal
      comp={
        <>
          <FormManage handle={modals.manageUser.handle}>
            {MANAGE_USER_BUTTONS.map(({ name, type, content }) => (
              <ButtonManage
                key={name}
                name={name}
                type={type}
                handle={handleUser}
                value={selectedUser?._id}
                content={content}
              />
            ))}
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

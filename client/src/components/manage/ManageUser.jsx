import "./manage.css";
import { CreateCar, OpenModal, EditUser } from "../index";
import { useUsersUIStore } from "../../stores/uiStores";
import { useUserAdminHandlers } from "../../pages/users/hooks/useUserAdminHandlers";
import ButtonManage from "./ButtonManage";
import FormManage from "./FormManage";

const MANAGE_USER_BUTTONS = [
  { name: "createCar",  type: "create", content: "Create Car"  },
  { name: "editUser",   type: "edit",   content: "Edit User"   },
  { name: "deleteUser", type: "delete", content: "Delete User" },
];

const ManageUser = () => {
  const selectedUser = useUsersUIStore((s) => s.selectedUser);
  const manageUserOpen = useUsersUIStore((s) => s.manageUserOpen);
  const toggleManageUser = useUsersUIStore((s) => s.toggleManageUser);
  const { handleUser } = useUserAdminHandlers();
  return (
    <OpenModal
      comp={
        <>
          <FormManage handle={toggleManageUser}>
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
      isOpen={manageUserOpen}
      onClose={toggleManageUser}
    />
  );
};

export default ManageUser;

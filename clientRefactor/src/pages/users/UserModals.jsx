
import ManageUser from "../../components/manage/ManageUser";
import { Register } from "../../components";

export default function UserModals() {
    return (
        <>
          <Register
            users={users}
            handelClick={handleCreateUser}
            isOpen={isOpenCreateUser}
          />
          <ManageUser
            user={selectedUser}
            handelClick={handleManageUser}
            isOpen={isOpenManageUser}
          />
        </>
      );
}

import ManageUser from "../../components/manage/ManageUser";
import { Register } from "../../components";
import DeleteUser from "../../components/delete/DeleteUser";
export default function UserModals() {
  return (
    <>
      <Register />
      <ManageUser />
      <DeleteUser />
    </>
  );
}

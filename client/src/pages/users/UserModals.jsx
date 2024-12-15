import ManageUser from "../../components/manage/ManageUser";
import { Register } from "../../components";
import DeleteUser from "../../components/delete/DeleteUser";
export default function UserModals() {

  //TODO: ADD POP UP When reigsted, created user with sign v
  //TODO: ADD POP UP When edited, edited (type,data,(maybe prevdata)) with sign v
  //TODO: ADD POP UP When deleted, deleted the user with sign v
  return (
    <>
      <Register />
      <ManageUser />
      <DeleteUser />
    </>
  );
}

import EditStatusService from "../../components/edit/EditStatusService";
import EditPaidService from "../../components/edit/EditPaidService";
import ManageService from "../../components/manage/ManageService";

export default function ServiceAdminModals() {
  // TODO: Create DeleteService component

  //TODO: ADD POP UP When created, created service with sign v
  //TODO: ADD POP UP When edited, edited (type,data,(maybe prevdata)) with sign v
  //TODO: ADD POP UP When deleted, deleted the user with sign v
  return (
    <>
      <ManageService />
      <EditStatusService />
      <EditPaidService />
    </>
  );
}

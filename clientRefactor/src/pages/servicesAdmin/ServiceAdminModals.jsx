import EditStatusService from "../../components/edit/EditStatusService";
import EditPaidService from "../../components/edit/EditPaidService";
import ManageService from "../../components/manage/ManageService";

//TODO:MODALS WITH CONTEXT
export default function ServiceAdminModals() {
  return (
    <>
      <ManageService />
      <EditStatusService />
      <EditPaidService />
    </>
  );
}

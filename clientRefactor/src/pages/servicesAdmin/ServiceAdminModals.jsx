import EditStatusService from "../../components/edit/EditStatusService";
import EditPaidService from "../../components/edit/EditPaidService";
import ManageService from "../../components/manage/ManageService";
import { useServicesAdminContext } from "./ServiceAdminContext";
//TODO:MODALS WITH CONTEXT
export default function ServiceAdminModals() {
    const {selectedService,modals} = useServicesAdminContext()
    return (
        <>
          <ManageService/>
          <EditStatusService

          />
          <EditPaidService
            service={selectedService}
            handelClick={modals.editPaid.onClose}
            isOpen={modals.editPaid.isOpen}
          />
        </>
      );
}

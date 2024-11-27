import EditStatusService from "../../components/edit/EditStatusService";
import EditPaidService from "../../components/edit/EditPaidService";
import ManageService from "../../components/manage/ManageService";
import { useServicesAdminContext } from "./ServiceAdminContext";

export default function ServiceAdminModals() {
    const {selectedService,modals} = useServicesAdminContext()
    return (
        <>
          <ManageService
            service={selectedService}
            handelClick={modals.manageService.onClose}
            isOpen={modals.manageService.isOpen}
          />
          <EditStatusService
            service={selectedService}
            handelClick={modals.editStatusService.onClose}
            isOpen={modals.editStatusService.isOpen}
          />
          <EditPaidService
            service={selectedService}
            handelClick={modals.editPaid.onClose}
            isOpen={modals.editPaid.isOpen}
          />
        </>
      );
}

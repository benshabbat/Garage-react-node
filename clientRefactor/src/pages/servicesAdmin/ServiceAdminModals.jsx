import EditStatusService from "../../components/edit/EditStatusService";
import EditPaidService from "../../components/edit/EditPaidService";
import ManageService from "../../components/manage/ManageService";

export default function ServiceAdminModals() {
    return (
        <>
          <ManageService
            service={service}
            handelClick={handelService}
            isOpen={isOpenService}
          />
          <EditStatusService
            service={service}
            handelClick={handleStatus}
            isOpen={isOpenStatus}
          />
          <EditPaidService
            service={service}
            handelClick={handlePaid}
            isOpen={isOpenPaid}
          />
        </>
      );
}

import "./manage.css";
import { OpenModel } from "../index";
import EditService from "../edit/EditService";
import { useServicesAdminContext } from "../../pages/servicesAdmin/ServiceAdminContext";
const ManageService = () => {
  const { selectedService, modals, handleServiceIdAction } =
    useServicesAdminContext();

  return (
    <OpenModel
      comp={
        <>
          <form className="form">
            <button
              onClick={modals.manageService.onClose}
              className="form-close"
            >
              X
            </button>
            <h1 className="header">Manage Admin</h1>
            <label className="form-label">
              <button name="editService" className="edit" onClick={handleServiceIdAction} value={selectedService?._id}>
                Edit Service
              </button>
            </label>
            <label className="form-label">
              <button
                name="deleteService"
                className="delete"
                onClick={handleServiceIdAction}
                value={selectedService?._id}
              >
                Delete Service
              </button>
            </label>
          </form>
          <EditService
            service={selectedService}
            handelClick={modals.editService.onClose}
            isOpen={modals.editService.isOpen}
          />
        </>
      }
      isOpen={modals.manageService.isOpen}
    />
  );
};

export default ManageService;

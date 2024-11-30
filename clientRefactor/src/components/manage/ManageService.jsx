import "./manage.css";
import { OpenModal } from "../index";
import EditService from "../edit/EditService";
import { useServicesAdminContext } from "../../pages/servicesAdmin/ServiceAdminContext";
const ManageService = () => {
  const { selectedService, modals, handleServiceIdAction } =
    useServicesAdminContext();

  return (
    <OpenModal
      comp={
        <>
          <form className="form">
            <button
              onClick={modals.manageService.handel}
              className="form-close"
            >
              X
            </button>
            <h1 className="header">Manage Admin</h1>
            <label className="form-label">
              <button
                name="editService"
                className="edit"
                onClick={handleServiceIdAction}
                value={selectedService?._id}
              >
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
          <EditService />
        </>
      }
      isOpen={modals.manageService.isOpen}
    />
  );
};

export default ManageService;

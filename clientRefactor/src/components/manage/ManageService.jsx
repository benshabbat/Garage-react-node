import "./manage.css";

import { deleteService } from "../../utils";
import useOpenModel from "../../hooks/useOpenModel";
import { OpenModel } from "../index";
import EditService from "../edit/EditService";
const ManageService = ({
  handelClick: handelClickManage = null,
  isOpen,
  service = null,
}) => {
  const [handleEditService, isOpenEditService] = useOpenModel();


  const handleCarID = async (e) => {
    e.preventDefault();
    const { name } = e.target;
    if (name === "deleteService") {
      await deleteService(service?._id);
      handelClickManage();
    }
    if (name === "editService") {
      handleEditService();
    }
  };

  return (
    <OpenModel
      comp={
        <>
          <form className="form">
          <button onClick={handelClickManage} className="form-close" >X</button>
            <h1 className="header">Manage Admin</h1>
            <h2>{`Hello ${service?.car?.numberPlate}`}</h2>
            <label className="form-label">
              <button name="editService" className="edit" onClick={handleCarID}>
                Edit Service
              </button>
            </label>
            <label className="form-label">
              <button
                name="deleteService"
                className="delete"
                onClick={handleCarID}
              >
                Delete Service
              </button>
            </label>
          </form>
          <EditService
            service={service}
            handelClick={handleEditService}
            isOpen={isOpenEditService}
          />
        </>
      }
      isOpen={isOpen}
    />
  );
};

export default ManageService;

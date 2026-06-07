import { OpenModal } from "../index";
import PropTypes from "prop-types";

const Delete = ({deleteData,handle,nameData,isOpen,handleDelete}) => {
  return (
    <OpenModal
      comp={
        <>
          <form className="form">
            <button type="button" onClick={handle} className="form-close">
              X
            </button>
            <h1 className="header">Delete</h1>
            <h2>Delete <strong>{deleteData}</strong>?</h2>
            <p className="delete-warning">⚠ This action cannot be undone.</p>
            <label className="form-label">
              <button
                type="button"
                name={nameData}
                className="delete"
                onClick={handleDelete}
              >
                Yes, delete
              </button>
            </label>
            <label className="form-label">
              <button type="button" name="noDelete" className="cancel" onClick={handle}>
                Cancel
              </button>
            </label>
          </form>
        </>
      }
      isOpen={isOpen}
    />
  );
};

Delete.propTypes = {
  deleteData: PropTypes.string,
  handle: PropTypes.func.isRequired,
  nameData: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default Delete;

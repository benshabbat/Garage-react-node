import { OpenModal } from "../index";
const Delete = ({deleteData,handle,nameData,isOpen,handleDelete}) => {
  return (
    <OpenModal
      comp={
        <>
          <form className="form">
            <button onClick={handle} className="form-close">
              X
            </button>
            <h1 className="header">Delete Car</h1>
            <h2>{`Are you sure to delete? :${deleteData}`}</h2>
            <label className="form-label">
              <button
                name={nameData}
                className="delete"
                onClick={handleDelete}
              >
                Yes
              </button>
            </label>
            <label className="form-label">
              <button name="noDelete" className="create" onClick={handle}>
                No
              </button>
            </label>
          </form>
        </>
      }
      isOpen={isOpen}
    />
  );
};

export default Delete;

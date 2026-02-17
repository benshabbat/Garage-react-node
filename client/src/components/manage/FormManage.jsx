import PropTypes from "prop-types";

export default function FormManage({ children, handle }) {
  return (
    <form className="form">
      <button onClick={handle} className="form-close">
        X
      </button>
      <h1 className="header">Manage Admin</h1>
      {children}
    </form>
  );
}

FormManage.propTypes = {
  children: PropTypes.node.isRequired,
  handle: PropTypes.func.isRequired,
};

import PropTypes from "prop-types";

export default function ButtonManage({ handle, value, type, name, content }) {
  return (
    <label className="form-label">
      <button name={name} className={type} onClick={handle} value={value}>
        {content}
      </button>
    </label>
  );
}

ButtonManage.propTypes = {
  handle: PropTypes.func.isRequired,
  value: PropTypes.string,
  type: PropTypes.oneOf(['create', 'edit', 'delete']).isRequired,
  name: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

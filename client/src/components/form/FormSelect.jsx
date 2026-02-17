import PropTypes from "prop-types";

export default function FormSelect({ name, options, handleChange, value }) {
  return (
    <label className="form-label">
      <span>{name}</span>
      <select name={name} onChange={handleChange} value={value || ''}>
        <option value="">{name}</option>
        {options?.map((option, index) => (
          <option
            key={index}
            value={name === "status" ? option?.value : option?._id}
          >
            {name === "status" ? option?.label : option?.username}
          </option>
        ))}
      </select>
    </label>
  );
}

FormSelect.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.array,
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.string,
};

import PropTypes from "prop-types";

export default function FormSelect({ name, options, handleChange, value }) {
  return (
    <label className="form-label">
      <span>{name}</span>
      <select name={name} onChange={handleChange} value={value || ""}>
        <option value="">{name}</option>
        {options?.map((option) => {
          const val = option?.value ?? option?._id;
          const label = option?.label ?? option?.username;
          return (
            <option key={val} value={val}>
              {label}
            </option>
          );
        })}
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

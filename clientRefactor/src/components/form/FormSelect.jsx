export default function FormSelect({ name, options, handleChange }) {
  return (
    <label className="form-label">
      <span>{name}</span>
      <select name={name} onChange={handleChange}>
        <option>{name}</option>
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

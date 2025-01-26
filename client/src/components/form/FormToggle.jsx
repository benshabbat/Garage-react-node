export default function FormToggle({ input, handleChange }) {
  return (
    <div className="toggle-container">
      <input
        type="checkbox"
        id={input.name}
        name={input.name}
        checked={input.checked}
        onChange={handleChange}
      />
      <label className="toggle-label" htmlFor={input.name}>
        <span className="toggle-switch"></span>
        {input.label || input.name}
      </label>
    </div>
  );
}

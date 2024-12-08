export default function ButtonManage({ handle, value, type, name, content }) {
  return (
    <label className="form-label">
      <button name={name} className={type} onClick={handle} value={value}>
        {content}
      </button>
    </label>
  );
}

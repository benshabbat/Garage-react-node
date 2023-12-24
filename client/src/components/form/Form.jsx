import "./form.css";
import Input from "../input/Input";
import CancelIcon from "@mui/icons-material/Cancel";
const Form = ({
  title,
  sec_title,
  inputs=[],
  onSubmit,
  handelClick = null,
  setData,
  options = null,
  nameSelect,
  isFocus = true,
}) => {
  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
    console.log(value);
  };
  return (
    <form className="form" onSubmit={onSubmit}>
      {handelClick && (
        <CancelIcon onClick={handelClick} className="form-close" />
      )}
      <h1 className="header">{title}</h1>
      <h2>{sec_title}</h2>

      {options && (
        <label className="form-label">
          <span>{nameSelect}</span>
          <select name={nameSelect} onChange={handleChange}>
            <option>{nameSelect}</option>
            {options?.map((option, index) => {
              return (
                <option
                  key={index}
                  value={nameSelect === "status" ? option?.value : option?._id}
                >
                  {nameSelect === "status" ? option?.label : option?.username}
                </option>
              );
            })}
          </select>
        </label>
      )}

      {inputs.map((i, index) => {
        return (
          <Input
            i={i}
            index={index}
            key={index}
            handleChange={handleChange}
            isFocus={isFocus}
          />
        );
      })}
      <button type="submit" className="form-btn">
        {title}
      </button>
    </form>
  );
};

export default Form;

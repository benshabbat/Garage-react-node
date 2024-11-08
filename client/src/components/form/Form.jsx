import "./form.css";
import Input from "../input/Input";
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
    console.log("check")
    const { name, value, checked, type } = e.target;
    console.log(name)
    setData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
    console.log(value);
  };
  return (
    <form className="form" onSubmit={onSubmit}>
      {handelClick && (
        <div onClick={handelClick} className="form-close" >X</div>
      )}
      <h1 className="header">{title}</h1>
      <h2 className="sec_title">{sec_title}</h2>

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
        Save
      </button>
    </form>
  );
};

export default Form;

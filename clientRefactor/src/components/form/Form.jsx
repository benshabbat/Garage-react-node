import "./form.css"
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
// TODO:USECONTEXT FOR FORM MAYBE
const Form = ({
  title,
  sec_title,
  inputs = [],
  onSubmit,
  handelClick = null,
  setData,
  options,
  nameSelect,
  isFocus = true,
}) => {
  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setData(prevState => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <form className="form" onSubmit={onSubmit}>
      {handelClick && (
        <button 
          type="button" 
          onClick={handelClick} 
          className="form-close"
          aria-label="Close form"
        >
          ×
        </button>
      )}
      
      <h1 className="header">{title}</h1>
      {sec_title && <h2 className="sec_title">{sec_title}</h2>}

      {options && nameSelect && (
        <FormSelect 
          name={nameSelect} 
          options={options} 
          handleChange={handleChange}
        />
      )}

      {inputs.map((input, index) => (
        <FormInput
          key={input.name || index}
          input={input}
          index={index}
          handleChange={handleChange}
          isFocus={isFocus}
        />
      ))}

      <button type="submit" className="form-btn">
        {title}
      </button>
    </form>
  );
};

export default Form;
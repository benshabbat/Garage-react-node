import "./form.css"
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";

const Form = ({
  title,
  inputs = [],
  onSubmit,
  handleClick = null,
  setData,
  options,
  nameSelect,
  isFocus = true,
}) => {
  // const handleChange = (e) => {
  //   const { name, value, checked, type } = e.target;
  //   setData(prevState => ({
  //     ...prevState,
  //     [name]: type === "checkbox" ? checked : value,
  //   }));
  // };
  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    console.log('Toggle changed:', name, checked); // Add this debug log
    setData(prevState => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  return (
    <form className="form" onSubmit={onSubmit}>
      {handleClick && (
        <button 
          type="button" 
          onClick={handleClick} 
          className="form-close"
          aria-label="Close form"
        >
          ×
        </button>
      )}
      
      <h1 className="header">{title}</h1>
      
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
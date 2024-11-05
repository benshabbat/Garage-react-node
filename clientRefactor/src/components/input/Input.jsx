import { useState, useRef, useEffect } from "react";
import { valid } from "../../validation/valid";
const Input = ({ i, index, handleChange, isFocus }) => {
  const [isBlur, setIsBlur] = useState(false);
  const ref = useRef();
  const [iputsType, setIputsType] = useState({});
    useEffect(() => {
    inputType(i);
  }, [i?.name]);
  
  const inputType = (i) => {
    switch (i?.name) {
      case "email":
        return setIputsType({
          title: "regex@gmail.com",
          errorMessage: "Your Email is wrong",
        });

      case "password":
        return setIputsType({
          title:
            "Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters",
          errorMessage: "Your password is wrong",
        });
      case "phone":
        return setIputsType({
          title: "Number of phone must 050-1234567",
          errorMessage: "Your phone number is wrong",
        });
      case "numberPlate":
        return setIputsType({
          title: "Number of car must 00-000-00 OR 000-00-000",
          errorMessage: "Your Car number is wrong",
        });
      default:
        return setIputsType({ title: i?.title, errorMessage: i?.errorMessage });
    }
  };


  return (
    <label className="form-label">
      {!i.hidden && <span>{i?.name}</span>}

      {i?.name === "username"
        ? i?.isError &&
          isBlur && <span className="error">{iputsType?.errorMessage}</span>
        : !valid(ref?.current?.value, i?.name) &&
          isBlur && <span className="error">{iputsType?.errorMessage}</span>}

      <input
        ref={ref}
        pattern={i?.pattern}
        autoFocus={index === 0 && isFocus}
        placeholder={i?.name}
        type={i?.type}
        name={i?.name}
        value={i?.value}
        checked={i?.checked? i?.checked: false}
        min={i?.min}
        title={iputsType?.title}
        hidden={i?.hidden}
        onChange={handleChange}
        aria-invalid={valid(ref?.current?.value, i?.name)}
        required={i?.type !== "checkbox" ? true : false}
        autoComplete="off"
        onBlur={() => setIsBlur(true)}
      />
    </label>
  );
};
export default Input;

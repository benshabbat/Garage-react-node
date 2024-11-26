import { valid } from '../../validation/valid';
import { useState, useRef } from 'react';


// Constants for input validation messages and patterns
const INPUT_TYPES = {
    email: {
      title: 'regex@gmail.com',
      errorMessage: 'Your Email is wrong',
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    password: {
      title: 'Must contain at least one number, uppercase and lowercase letter, and at least 8 characters',
      errorMessage: 'Your password is wrong',
      pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/
    },
    phone: {
      title: 'Number of phone must 050-1234567',
      errorMessage: 'Your phone number is wrong',
      pattern: /^\d{3}-\d{7}$/
    },
    numberPlate: {
      title: 'Number of car must 00-000-00 OR 000-00-000',
      errorMessage: 'Your Car number is wrong',
      pattern: /^(\d{2}-\d{3}-\d{2}|\d{3}-\d{2}-\d{3})$/
    }
  };
  
  
export default function FormInput({ input, handleChange, isFocus, index }) {
  const [isBlur, setIsBlur] = useState(false);
  const inputRef = useRef();
  const inputType = INPUT_TYPES[input.name] || {
    title: input.title,
    errorMessage: input.errorMessage,
  };

  const showError =
    isBlur &&
    (input.name === "username"
      ? input.isError
      : !valid(inputRef?.current?.value, input.name));

  return (
    <label className="form-label">
      {!input.hidden && <span>{input.name}</span>}
      {showError && <span className="error">{inputType.errorMessage}</span>}
      <input
        {...input}
        ref={inputRef}
        autoFocus={index === 0 && isFocus}
        placeholder={input.name}
        title={inputType.title}
        onChange={handleChange}
        aria-invalid={valid(inputRef?.current?.value, input?.name)}
        required={input.type !== "checkbox"}
        autoComplete="off"
        onBlur={() => setIsBlur(true)}
      />
    </label>
  );
}

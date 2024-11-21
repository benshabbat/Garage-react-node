import "./login.css";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../features/auth/authSlice";
import { Form, OpenModel } from "..";
import { useSelector } from "react-redux";
export default function NewLogin({ isOpen }) {
  const { isError, message } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState();
  const dispatch = useDispatch();
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    dispatch(login(formData));
  };
  useEffect(() => {
    console.log(isError);
  }, [isError, message]);
  return (
    <OpenModel
      comp={
        <div className="wrapper-login">
          <form onSubmit={onSubmit}>
            <h1>Login</h1>
            <div className="input-box">
              {/* <label form="username">Username</label>
        <span className="error"></span> */}
              <input type="text" name="username" placeholder="username" />
            </div>
            <div className="input-box">
              {/* <label form="password">Password</label>
        <span className="error"></span> */}
              <input type="password" name="password" placeholder="password"/>
            </div>
            <div className="remember-forgot">
              <label>
                <input type="checkbox" />
                Remember me
              </label>
              <a>Forgot Password?</a>
            </div>
            <button type="submit" className="btn">
              Login
            </button>
            <div className="register-link">
              <p>
                Don't have an account?
                <a> Contact Us</a>
              </p>
            </div>
          </form>
        </div>
      }
      isOpen={isOpen}
    />
  );
}

{
  /* <Form
  setData={setFormData}
  title="Login"
  sec_title="enter your name & password"
  inputs={[
    {
      name: "username",
      type: "text",
      errorMessage: "Your username or password is wrong",
      isError,
    },
    {
      name: "password",
      type: "password",
    },
  ]}
  handelClick={handelClick}
  onSubmit={onSubmit}
/>; */
}

import "./login.css";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../features/auth/authSlice";
import { OpenModal } from "..";
export default function NewLogin({ isOpen }) {
  const { isError, message } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState();
  const dispatch = useDispatch();
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData));
  };
  return (
    <OpenModal
      comp={
        <div className="wrapper-login">
          <form onSubmit={onSubmit}>
            <h1>Login</h1>
            <div className="input-box">
              <input type="text" name="username" placeholder="username" />
            </div>
            <div className="input-box">
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

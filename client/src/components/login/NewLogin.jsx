import "./login.css";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../features/auth/authSlice";
import { OpenModal } from "..";
export default function NewLogin({ isOpen }) {
  const { isError, message } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({ username: "", password: "" });
  const dispatch = useDispatch();
  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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
              <label htmlFor="login-username" className="sr-only">Username</label>
              <input
                id="login-username"
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div className="input-box">
              <label htmlFor="login-password" className="sr-only">Password</label>
              <input
                id="login-password"
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
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

import "./login.css";
import { OpenModal } from "..";
import { useLoginForm } from "./hooks/useLoginForm";

export default function NewLogin({ isOpen }) {
  const { formData, handleChange, onSubmit, isError, message } = useLoginForm();
  return (
    <OpenModal
      comp={
        <div className="wrapper-login">
          <form onSubmit={onSubmit}>
            <h1>Login</h1>
            {isError && <p className="error">{message}</p>}
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
                Don&apos;t have an account?
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

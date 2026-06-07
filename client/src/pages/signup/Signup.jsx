import { useNavigate, Link } from "react-router-dom";
import "./signup.css";
import { useSignupForm } from "./hooks/useSignupForm";

const FIELDS = [
  {
    name: "username",
    type: "text",
    label: "Username",
    placeholder: "Username",
    autoComplete: "username",
  },
  { name: "email", type: "email", label: "Email", placeholder: "Email", autoComplete: "email" },
  {
    name: "phone",
    type: "tel",
    label: "Phone",
    placeholder: "e.g. 050-123-4567",
    autoComplete: "tel",
  },
  {
    name: "password",
    type: "password",
    label: "Password",
    placeholder: "Password",
    autoComplete: "new-password",
  },
];

const Signup = () => {
  const navigate = useNavigate();
  const { formData, isLoading, isSuccess, isError, message, handleChange, handleSubmit } =
    useSignupForm();

  if (isSuccess) {
    return (
      <div className="signup-container">
        <div className="signup-card">
          <h1 className="signup-title">Account Created!</h1>
          <p className="signup-success-msg">
            Your account has been created successfully. You can now log in.
          </p>
          <button className="signup-btn" onClick={() => navigate("/")}>
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h1 className="signup-title">Create Account</h1>
        <p className="signup-subtitle">Join Garage770 and manage your vehicle services</p>

        <form className="signup-form" onSubmit={handleSubmit} noValidate>
          {FIELDS.map(({ name, type, label, placeholder, autoComplete }) => (
            <label key={name} className="signup-field">
              <span className="sr-only">{label}</span>
              <input
                id={`signup-${name}`}
                className="signup-input"
                type={type}
                name={name}
                placeholder={placeholder}
                autoComplete={autoComplete}
                value={formData[name]}
                onChange={handleChange}
                required
              />
            </label>
          ))}

          {isError && <p className="signup-error">{message}</p>}

          <button className="signup-btn" type="submit" disabled={isLoading}>
            {isLoading ? "Creating account…" : "Sign Up"}
          </button>
        </form>

        <p className="signup-login-link">
          Already have an account?{" "}
          <Link to="/" className="signup-link">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;

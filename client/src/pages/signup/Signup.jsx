import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";
import "./signup.css";

const FIELDS = [
  { name: "username", type: "text", placeholder: "Username", autoComplete: "username" },
  { name: "email", type: "email", placeholder: "Email", autoComplete: "email" },
  { name: "phone", type: "tel", placeholder: "Phone (e.g. 050-123-4567)", autoComplete: "tel" },
  { name: "password", type: "password", placeholder: "Password", autoComplete: "new-password" },
];

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });
  const signup = useAuthStore((s) => s.signup);
  const isLoading = useAuthStore((s) => s.isLoading);
  const isSuccess = useAuthStore((s) => s.isSuccess);
  const isError = useAuthStore((s) => s.isError);
  const message = useAuthStore((s) => s.message);
  const reset = useAuthStore((s) => s.reset);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (isError) reset();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(formData);
  };

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
          {FIELDS.map(({ name, type, placeholder, autoComplete }) => (
            <input
              key={name}
              className="signup-input"
              type={type}
              name={name}
              placeholder={placeholder}
              autoComplete={autoComplete}
              value={formData[name]}
              onChange={handleChange}
              required
            />
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

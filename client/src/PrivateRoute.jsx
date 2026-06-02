import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuthStore } from "./stores/authStore";

export function PrivateRoute({ children }) {
  const user = useAuthStore((s) => s.user);
  const isLoading = useAuthStore((s) => s.isLoading);

  if (isLoading) {
    return <div style={{ textAlign: "center", marginTop: "50px" }}>טוען...</div>;
  }

  if (!user) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

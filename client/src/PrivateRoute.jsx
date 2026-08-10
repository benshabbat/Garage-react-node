import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuthStore } from "./stores/authStore";
import { ACCESS, resolveRouteAccess } from "./utils/routeAccess";

export function PrivateRoute({ children, adminOnly = false }) {
  const user = useAuthStore((s) => s.user);
  const isLoading = useAuthStore((s) => s.isLoading);

  switch (resolveRouteAccess({ user, isLoading, adminOnly })) {
    case ACCESS.LOADING:
      return <div style={{ textAlign: "center", marginTop: "50px" }}>טוען...</div>;
    case ACCESS.REQUIRE_LOGIN:
      return <Navigate to="/" replace />;
    case ACCESS.REQUIRE_ADMIN:
      return <Navigate to="/unauthorized" replace />;
    default:
      return <>{children}</>;
  }
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
  adminOnly: PropTypes.bool,
};

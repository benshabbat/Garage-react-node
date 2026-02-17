import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

export function PrivateRoute({ children }) {
  const { user: userAuth, isLoading } = useSelector((state) => state.auth);
  const location = useLocation();

  if (isLoading) {
    return <div style={{ textAlign: "center", marginTop: "50px" }}>טוען...</div>;
  }

  if (!userAuth) {
    return <Navigate to="/unauthorized" state={{ from: location }} />;
  }

  return<>
   {children}
  </>
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

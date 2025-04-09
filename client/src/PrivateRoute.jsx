import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export function PrivateRoute({ children }) {
  const { user: userAuth, isLoading } = useSelector((state) => state.auth);

  // הצגת עמוד טעינה בזמן בדיקת ההרשאות
  if (isLoading) {
    return <div style={{ textAlign: "center", marginTop: "50px" }}>טוען...</div>;
  }

  // בדיקת הרשאות
  return userAuth ? children : <Navigate to="/unauthorized" />;
}

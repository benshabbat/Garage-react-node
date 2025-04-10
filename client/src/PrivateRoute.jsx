import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export function PrivateRoute({ children }) {
  const { user: userAuth, isLoading } = useSelector((state) => state.auth);
  const location = useLocation();

  // הצגת עמוד טעינה בזמן בדיקת ההרשאות
  if (isLoading) {
    return <div style={{ textAlign: "center", marginTop: "50px" }}>טוען...</div>;
  }

  // בדיקת הרשאות
  if (!userAuth) {
    return <Navigate to="/unauthorized" state={{ from: location }} />;
  }

  // אם המשתמש מחובר, הצג את התוכן
  return children;
}

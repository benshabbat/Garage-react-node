import { Link } from "react-router-dom";

function Unauthorized() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>אין לך הרשאה לגשת לדף זה</h1>
      <p>אנא התחבר כדי להמשיך.</p>
      <Link to="/" style={{ color: "blue", textDecoration: "underline" }}>
        חזור לדף הבית
      </Link>
    </div>
  );
}

export default Unauthorized;
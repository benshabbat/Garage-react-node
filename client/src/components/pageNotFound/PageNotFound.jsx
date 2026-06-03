import { Link } from "react-router-dom";
import "./pageNotFound.css";

const PageNotFound = () => {
  return (
    <div className="not-found">
      <h1>404 - הדף לא נמצא</h1>
      <Link to="/">חזור לדף הבית</Link>
    </div>
  );
};

export default PageNotFound;

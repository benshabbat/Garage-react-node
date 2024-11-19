import { Link } from "react-router-dom";
import { MyAccount } from "../index";
const NavAdmin = ({user}) => {
  return (
    <>
      <div className="item-nav">
        <Link to={`/users`}>Users</Link>
      </div>
      <div className="item-nav">
        <Link to={`/cars`}>Cars</Link>
      </div>
      <div className="item-nav">
        <Link to={`/services`}>Services</Link>
      </div>
      <div className="item-nav">
        <Link to={`/messages`}>Messages</Link>
      </div>
      <div className="item-nav">
        <Link to={`/messages-contact`}>Messages-Contact</Link>
      </div>
      <div className="item-nav">
        <Link to={`/calendar`}>Calendar</Link>
      </div>
      <div className="item-nav dropdown">
        <MyAccount user={user} />
      </div>
    </>
  );
};

export default NavAdmin;

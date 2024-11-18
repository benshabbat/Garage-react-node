import { Link } from "react-router-dom";
import { MyAccount } from "../index";
const NavUser = ({user}) => {
  return (
    <>
      {/* <div className="item-nav">
        <Link to={`/services/user`}>Services</Link>
      </div> */}
      <div className="item-nav">
        <Link to={`/account`}>Account</Link>
      </div>
      <div className="item-nav">
        <Link to={`/messages`}>Messages</Link>
      </div>
      <div className="item-nav dropdown">
        <MyAccount user={user} />
      </div>
    </>
  );
};

export default NavUser;

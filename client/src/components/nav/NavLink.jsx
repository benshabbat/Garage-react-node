import { Link } from "react-router-dom";
import PropTypes from "prop-types";

/**
 * Reusable navigation link component
 * @param {string} to - Link destination
 * @param {Function} onClick - Click handler (usually for closing nav)
 * @param {string} children - Link text
 */
const NavLink = ({ to, onClick, children }) => {
  return (
    <Link to={to} onClick={onClick}>
      {children}
    </Link>
  );
};

NavLink.propTypes = {
  to: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
};

export default NavLink;

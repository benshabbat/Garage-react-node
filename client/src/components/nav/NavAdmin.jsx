import NavLink from "./NavLink";
import { MyAccount } from "../index";
import { useHeaderContext } from "../header/HeaderContext";

const NAV_LINKS = [
  { to: "/users", label: "Users" },
  { to: "/cars", label: "Cars" },
  { to: "/services", label: "Services" },
  { to: "/messages", label: "Messages" },
  { to: "/messages-contact", label: "Messages-Contact" },
];

const NavAdmin = () => {
  const { handleOutsideClick } = useHeaderContext();
  
  return (
    <>
      {NAV_LINKS.map((link) => (
        <NavLink key={link.to} to={link.to} onClick={handleOutsideClick}>
          {link.label}
        </NavLink>
      ))}
      <MyAccount />
    </>
  );
};

export default NavAdmin;

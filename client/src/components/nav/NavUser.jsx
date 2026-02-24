import NavLink from "./NavLink";
import { MyAccount } from "../index";
import { useHeaderContext } from "../header/HeaderContext";

const NAV_LINKS = [
  { to: "/myCars", label: "MyCars" },
  { to: "/messages", label: "Messages" },
  { to: "/appointments", label: "Appointments" },
];

const NavUser = () => {
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

export default NavUser;

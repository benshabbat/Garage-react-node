import NavLink from "./NavLink";
import { MyAccount } from "../index";
import { useHeaderHandlers } from "../header/hooks/useHeaderHandlers";

// Appointments is an admin console (it lists every booking), so it is not linked
// here — customers book through the form on the landing page.
const NAV_LINKS = [
  { to: "/myCars", label: "MyCars" },
  { to: "/messages", label: "Messages" },
];

const NavUser = () => {
  const { handleOutsideClick } = useHeaderHandlers();

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

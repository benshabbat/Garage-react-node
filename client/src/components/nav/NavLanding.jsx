import { useHeaderHandlers } from "../header/hooks/useHeaderHandlers";

const NavLanding = () => {
  const { handleOutsideClick, handleLogin } = useHeaderHandlers();

  return (
    <>
      <a href="#about" onClick={handleOutsideClick}>
        About
      </a>
      <a href="#contact" onClick={handleOutsideClick}>
        Contact
      </a>
      <a href="#reviews" onClick={handleOutsideClick}>
        Reviews
      </a>
      <button onClick={handleLogin}>Login</button>
    </>
  );
};

export default NavLanding;

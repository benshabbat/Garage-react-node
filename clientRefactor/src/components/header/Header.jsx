import "./header.css";
import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import HeaderProvider from "./HeaderProvider";
import Navbars from "./Navbars";

const Header = () => {
  return (
      <HeaderProvider>
        <Navbars />
        <Suspense fallback={<h1>Loading..</h1>}>
          <Outlet />
        </Suspense>
      </HeaderProvider>
  );
};

export default Header;

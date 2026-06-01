import "./header.css";
import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import HeaderProvider from "./HeaderProvider";
import Navbars from "./Navbars";

const Header = () => {
  return (
    <>
      <HeaderProvider>
        <Navbars />
      </HeaderProvider>
      <Suspense fallback={<div className="page-loader" aria-label="Loading" />}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default Header;

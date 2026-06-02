import "./header.css";
import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import Navbars from "./Navbars";
import { useHeaderInit } from "./hooks/useHeaderInit";

const Header = () => {
  useHeaderInit();

  return (
    <>
      <Navbars />
      <Suspense fallback={<div className="page-loader" aria-label="Loading" />}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default Header;

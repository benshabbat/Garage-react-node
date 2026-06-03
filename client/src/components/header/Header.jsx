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
      <Suspense fallback={<div className="page-loader" role="status" aria-label="Loading page" />}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default Header;

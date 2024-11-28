import "./header.css";
import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import HeaderProvider from "./HeaderProvider";
import Navbars from "./Navbars";

// import { useSelector, useDispatch } from "react-redux";
// import { getUser } from "../../features/user/userSlice";
//TODO: Context for header with navbars
const Header = () => {
  // const [isNavOpen, setIsNavOpen] = useState(false);
  // const { user: userAuth } = useSelector((state) => state.auth);
  // const { user } = useSelector((state) => state.user);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   if (userAuth?._id) dispatch(getUser(userAuth?._id));
  // }, [dispatch, userAuth]);

  // const handleOutsideClick = () => setIsNavOpen(!isNavOpen);

  return (
    <>
      <HeaderProvider>
        <Navbars />
      </HeaderProvider>
      <Suspense fallback={<h1>Loading..</h1>}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default Header;

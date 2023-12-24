import "./App.css";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components";
import {
  Account,
  Services,
  Messages,
  PageLanding,
  Users,
  Cars,
  ServicesAdmin,
} from "./pages";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "./features/user/userSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CheckFormWithPattern from "./components/CheckFormWithPattern";
import PageNotFound from "./components/pageNotFound/PageNotFound";
function App() {
  const { user: userAuth } = useSelector((state) => state.auth);
  const { messages, user } = useSelector((state) => state.user);
  const { services, cars, users } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  useEffect(() => {
    if (userAuth?._id) dispatch(getUser(userAuth?._id));
  }, [userAuth]);
  return (
    <>
      <BrowserRouter>
        <Header userAuth={userAuth} user={user} />

        <Routes>
          <Route path="/" element={<PageLanding />} />
          <Route path="/check" element={<CheckFormWithPattern />} />
          <Route path="/account" element={<Account user={user} />} />
          <Route path="/users" element={<Users users={users} />} />
          <Route
            path="/cars"
            element={<Cars userId={user?._id} cars={cars} />}
          />
          <Route
            path="/messages"
            element={<Messages messages={messages} user={user} users={users} />}
          />
          <Route
            path="/services"
            element={<ServicesAdmin services={services} />}
          />
          <Route path="/services/user/" element={<Services user={user} />} />
          <Route
            path="/services/car/:carId"
            element={<Services user={user} />}
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}
export default App;

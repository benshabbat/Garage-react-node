import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components";
import {
  Account,
  Messages,
  PageLanding,
  Users,
  Cars,
  ServicesAdmin,
} from "./pages";
import PageNotFound from "./components/pageNotFound/PageNotFound";
import MessagesOfContact from "./pages/messagesOfContact/MessagesOfContact.jsx";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

//TODO:ROUTER V7
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      dispatch({ type: "auth/login/fulfilled", payload: storedUser });
    }
  }, [dispatch]);
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<PageLanding />} />
          <Route path="/myCars" element={<Account />} />
          <Route path="/users" element={<Users />} />
          <Route path="/cars" element={<Cars />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/services" element={<ServicesAdmin />} />
          <Route path="/messages-contact" element={<MessagesOfContact />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;

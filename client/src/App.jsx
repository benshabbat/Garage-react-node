import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
import { useSelector } from "react-redux";

// PrivateRoute component
function PrivateRoute({ children }) {
  const { user: userAuth } = useSelector((state) => state.auth);
  return userAuth ? children : <Navigate to="/unauthorized" />;
}

//TODO:ROUTER V7
function App() {

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<PageLanding />} />
          <Route
            path="/myCars"
            element={
              <PrivateRoute>
                <Account />
              </PrivateRoute>
            }
          />
          <Route
            path="/users"
            element={
              <PrivateRoute>
                <Users />
              </PrivateRoute>
            }
          />
          <Route
            path="/cars"
            element={
              <PrivateRoute>
                <Cars />
              </PrivateRoute>
            }
          />
          <Route
            path="/messages"
            element={
              <PrivateRoute>
                <Messages />
              </PrivateRoute>
            }
          />
          <Route
            path="/services"
            element={
              <PrivateRoute>
                <ServicesAdmin />
              </PrivateRoute>
            }
          />
          <Route
            path="/messages-contact"
            element={
              <PrivateRoute>
                <MessagesOfContact />
              </PrivateRoute>
            }
          />
          <Route path="/unauthorized" element={<h1>אין לך הרשאה לגשת לדף זה</h1>} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components";
import {
  Account,
  Messages,
  PageLanding,
  Users,
  Cars,
  ServicesAdmin,
  Appointments,
} from "./pages";
import PageNotFound from "./components/pageNotFound/PageNotFound";
import MessagesOfContact from "./pages/messagesOfContact/MessagesOfContact.jsx";
import { PrivateRoute } from "./PrivateRoute.jsx";
import Unauthorized from "./pages/Unauthorized";

//TODO:ROUTER V7
function App() {
  return (
    <>
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true
        }}
      >
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
          <Route
            path="/appointments"
            element={
              <PrivateRoute>
                <Appointments />
              </PrivateRoute>
            }
          />
          <Route path="/unauthorized" element={<Unauthorized />} />
          
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

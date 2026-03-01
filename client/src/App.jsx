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
  Dashboard,
} from "./pages";
import PageNotFound from "./components/pageNotFound/PageNotFound";
import MessagesOfContact from "./pages/messagesOfContact/MessagesOfContact.jsx";
import { PrivateRoute } from "./PrivateRoute.jsx";
import Unauthorized from "./pages/Unauthorized";

const PRIVATE_ROUTES = [
  { path: "/myCars",           Component: Account },
  { path: "/users",            Component: Users },
  { path: "/cars",             Component: Cars },
  { path: "/messages",         Component: Messages },
  { path: "/services",         Component: ServicesAdmin },
  { path: "/messages-contact", Component: MessagesOfContact },
  { path: "/appointments",     Component: Appointments },
  { path: "/dashboard",        Component: Dashboard },
];

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
          {PRIVATE_ROUTES.map(({ path, Component }) => (
            <Route
              key={path}
              path={path}
              element={
                <PrivateRoute>
                  <Component />
                </PrivateRoute>
              }
            />
          ))}
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

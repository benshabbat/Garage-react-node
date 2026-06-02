import { lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header, Agent } from "./components";
import PageNotFound from "./components/pageNotFound/PageNotFound";
import { PrivateRoute } from "./PrivateRoute.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";

const PageLanding       = lazy(() => import("./pages/pageLanding/PageLanding"));
const Account           = lazy(() => import("./pages/account/Account"));
const Users             = lazy(() => import("./pages/users/Users"));
const Cars              = lazy(() => import("./pages/cars/Cars"));
const Messages          = lazy(() => import("./pages/messages/Messages"));
const ServicesAdmin     = lazy(() => import("./pages/servicesAdmin/ServicesAdmin"));
const MessagesOfContact = lazy(() => import("./pages/messagesOfContact/MessagesOfContact"));
const Appointments      = lazy(() => import("./pages/appointments/Appointments"));
const Dashboard         = lazy(() => import("./pages/dashboard/Dashboard"));
const Unauthorized      = lazy(() => import("./pages/Unauthorized"));

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
    <ErrorBoundary>
      <BrowserRouter>
        <a href="#main-content" className="skip-link">Skip to content</a>
        <Header />
        <main id="main-content">
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
        </main>
      </BrowserRouter>
      <Agent />
    </ErrorBoundary>
  );
}

export default App;

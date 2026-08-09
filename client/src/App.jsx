import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header, Agent } from "./components";
import Toast from "./components/Toast";
import PageNotFound from "./components/pageNotFound/PageNotFound";
import { PrivateRoute } from "./PrivateRoute.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";

const PageLanding = lazy(() => import("./pages/pageLanding/PageLanding"));
const Account = lazy(() => import("./pages/account/Account"));
const Users = lazy(() => import("./pages/users/Users"));
const Cars = lazy(() => import("./pages/cars/Cars"));
const Messages = lazy(() => import("./pages/messages/Messages"));
const ServicesAdmin = lazy(() => import("./pages/servicesAdmin/ServicesAdmin"));
const MessagesOfContact = lazy(() => import("./pages/messagesOfContact/MessagesOfContact"));
const Appointments = lazy(() => import("./pages/appointments/Appointments"));
const Dashboard = lazy(() => import("./pages/dashboard/Dashboard"));
const Signup = lazy(() => import("./pages/signup/Signup"));
const Unauthorized = lazy(() => import("./pages/Unauthorized"));

// adminOnly pages read admin-scoped endpoints, so a signed-in customer landing
// on one would only see failed requests — send them to /unauthorized instead.
const PRIVATE_ROUTES = [
  { path: "/myCars", Component: Account },
  { path: "/messages", Component: Messages },
  { path: "/users", Component: Users, adminOnly: true },
  { path: "/cars", Component: Cars, adminOnly: true },
  { path: "/services", Component: ServicesAdmin, adminOnly: true },
  { path: "/messages-contact", Component: MessagesOfContact, adminOnly: true },
  { path: "/appointments", Component: Appointments, adminOnly: true },
  { path: "/dashboard", Component: Dashboard, adminOnly: true },
];

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <Header />
        <main id="main-content">
          <Suspense
            fallback={<div className="page-loader" role="status" aria-label="Loading page" />}
          >
            <Routes>
              <Route path="/" element={<PageLanding />} />
              {PRIVATE_ROUTES.map(({ path, Component, adminOnly }) => (
                <Route
                  key={path}
                  path={path}
                  element={
                    <PrivateRoute adminOnly={adminOnly}>
                      <Component />
                    </PrivateRoute>
                  }
                />
              ))}
              <Route path="/signup" element={<Signup />} />
              <Route path="/unauthorized" element={<Unauthorized />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </main>
      </BrowserRouter>
      <Agent />
      <Toast />
    </ErrorBoundary>
  );
}

export default App;

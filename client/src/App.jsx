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
import MessagesOfContact from "./pages/messagesOfContact/MessagesOfContact.jsx";

// Layout Component
const Layout = ({ children }) => (
  <>
    <Header />
    {children}
  </>
);

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<PageLanding />} />
          <Route path="/myCars" element={<Account />} />
          <Route path="/users" element={<Users />} />
          <Route path="/cars" element={<Cars />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/services" element={<ServicesAdmin />} />
          <Route path="/messages-contact" element={<MessagesOfContact />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
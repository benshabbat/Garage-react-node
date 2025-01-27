import { BrowserRouter, Routes, Route, Navigate, HashRouter } from "react-router-dom";
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


//TODO:ROUTER V7
function App() {
  return (
    <>
      <HashRouter >
      {/* <BrowserRouter> */}
        <Header />
        <Routes>
          <Route path="/" element={<PageLanding />} />
          <Route path="/myCars" element={<Account />} />
          <Route path="/users" element={<Users />} />
          <Route path="/cars" element={<Cars />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/services" element={<ServicesAdmin />} />
          <Route path="/messages-contact" element={<MessagesOfContact />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      {/* </BrowserRouter> */}
      </HashRouter>
    </>
  );
}
export default App;

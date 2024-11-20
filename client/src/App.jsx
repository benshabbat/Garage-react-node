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
import PageNotFound from "./components/pageNotFound/PageNotFound";
import Home from "./components/landing/codeOfClaude/Home";
import { Navigation } from "./components/landing/codeOfClaude/Navigation";
import MessagesOfContact from "./pages/MessagesOfContact";
import Calendar from "./pages/Calendar";
function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        {/* <Navigation/> */}
        <Routes>
          <Route path="/" element={<PageLanding />} />
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/account" element={<Account />} />
          <Route path="/users" element={<Users />} />
          <Route path="/cars" element={<Cars />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/services" element={<ServicesAdmin />} />
          <Route path="/calendar" element={<Calendar/>} />
          <Route path="/messages-contact" element={<MessagesOfContact/>} />
          {/* <Route path="/services/user/" element={<Services />} /> */}
          <Route path="/services/car/:carId" element={<Services />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
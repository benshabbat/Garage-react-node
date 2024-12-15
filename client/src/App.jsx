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
import MessagesOfContact from "./pages/MessagesOfContact/MessagesOfContact";

//TODO:ROUTER V7
function App() {
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
          <Route path="/messages-contact" element={<MessagesOfContact/>} />
          <Route path="/services/car/:carId" element={<Services />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;

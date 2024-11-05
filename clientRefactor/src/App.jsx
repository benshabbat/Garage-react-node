import "./App.css";
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
import CheckFormWithPattern from "./components/CheckFormWithPattern";
import PageNotFound from "./components/pageNotFound/PageNotFound";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route path="/" element={<PageLanding />} />
            <Route path="/check" element={<CheckFormWithPattern />} />
            <Route path="/account" element={<Account />} />
            <Route path="/users" element={<Users />} />
            <Route path="/cars" element={<Cars />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/services" element={<ServicesAdmin />} />
            <Route path="/services/user/" element={<Services />} />
            <Route path="/services/car/:carId" element={<Services />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;

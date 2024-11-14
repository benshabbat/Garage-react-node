import "./pageLanding.css";
import Home from "../home/Home";
import {
  Reviews,
  // Address,
  About,
  ServicesLanding,
  Contact,
} from "../../components";
import ContactLanding from "../../components/landing/codeOfClaude/ContactLanding";


const PageLanding = () => {
  return (
    <div className="main">
      <Home />
      <About />
      <ServicesLanding />
      <ContactLanding/>
      <div className="address_and_contact">
        {/* <Address /> */}
        {/* <Contact /> */}

      </div>
      <Reviews />
      <footer>Written By David-Chen Benshabbat</footer>
    </div>
  );
};

export default PageLanding;

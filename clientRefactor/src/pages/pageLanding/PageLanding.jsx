import "./pageLanding.css";
import Home from "../home/Home";
import { Reviews, About, ServicesLanding, Contact } from "../../components";
import NewContact from "../../components/landing/contact/newContact";

const PageLanding = () => {
  return (
    <div className="main">
      {/* <Home />
      <About /> */}
      <ServicesLanding />
      {/* <Contact /> */}
      <NewContact/>
      <Reviews />
      <footer>Written By David-Chen Benshabbat</footer>
    </div>
  );
};

export default PageLanding;

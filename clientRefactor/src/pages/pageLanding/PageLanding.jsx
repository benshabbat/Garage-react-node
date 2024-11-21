import "./pageLanding.css";
import Home from "../home/Home";
import { Reviews, About, ServicesLanding, Contact } from "../../components";

const PageLanding = () => {
  return (
    <div className="main">
      <Home />
      <About />
      <ServicesLanding />
      <Contact />
      <Reviews />
      <footer>Written By David-Chen Benshabbat</footer>
    </div>
  );
};

export default PageLanding;

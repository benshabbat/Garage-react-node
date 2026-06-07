import "./pageLanding.css";
import { Reviews, About } from "../../components";
import NewContact from "../../components/landing/contact/NewContact.jsx";

const PageLanding = () => {
  return (
    <main id="main-content" className="main">
      <About />
      <NewContact />
      <Reviews />
    </main>
  );
};

export default PageLanding;

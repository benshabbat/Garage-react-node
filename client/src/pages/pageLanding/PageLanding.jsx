import "./pageLanding.css";
import { Reviews, About} from "../../components";
import NewContact from "../../components/landing/contact/NewContact.jsx";

const PageLanding = () => {
  return (
    <div className="main">
      <About />
      <NewContact/>
      {/* <Reviews /> */}
      <footer>Written By David-Chen Benshabbat</footer>
    </div>
  );
};

export default PageLanding;

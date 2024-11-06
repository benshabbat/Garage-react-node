import arrowForward from "../../../images/arrow_forward.png";
import garage404 from "../../../images/garage404.jpg";
import "./carousel.css"
function Carousel() {
  return (
    <div className="container-carousel">
      <div className="card-wrapper-carousel">
        <ul className="card-list-carousel">
          <li className="card-item-carousel">
            <a href="#" className="card-link-carousel">
              <img src={garage404} className="card-image" alt="image card"></img>
              <p className="badge">test</p>
              <h2 className="card-title">dsasad</h2>
              <button className="card-button">
                <img src={arrowForward}></img>
              </button>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Carousel;

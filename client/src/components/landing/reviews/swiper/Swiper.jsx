import "./swiper.css";
import NextCard from "./NextCard";
import Pagination from "./Pagination";
import PrevCard from "./Prevcard";
import Slides from "./Slides";

const Swiper = ({ children }) => {
  return (
    <div className="swiper-outer-container">
      <div className="swiper-container">
        <div className="swiper-wrapper">
          <PrevCard />
          <div className="swiper-content">
            <Slides>{children}</Slides>
          </div>
          <NextCard />
        </div>
        <Pagination />
      </div>
    </div>
  );
};

export default Swiper;

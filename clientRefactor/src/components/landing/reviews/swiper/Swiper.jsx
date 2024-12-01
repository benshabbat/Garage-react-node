import "./swiper.css";
import { useSwiper } from "./useSwiper";
// import NextCard from "./NextCard";
// import Pagination from "./Pagination";
// import PrevCard from "./Prevcard";
// import Slides from "./Slides";
// import SwiperProvider from "./SwiperProvider";


//dont work with context
const Swiper = ({ children }) => {
  const { Slides, Pagination, PrevCard, NextCard } = useSwiper(children);
  
  return (
    // <SwiperProvider>
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
    // </SwiperProvider>
  );
};

export default Swiper;

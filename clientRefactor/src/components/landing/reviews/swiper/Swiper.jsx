import "./swiper.css";
import { useSwiper } from "./useSwiper";
// import NextCard from "./NextCard";
// import Pagination from "./Pagination";
// import PrevCard from "./Prevcard";
// import Slides from "./Slides";
import SwiperProvider from "./SwiperProvider";

const Swiper = ({ children, numCardsPreview }) => {
  const { Slides,Pagination ,PrevCard,NextCard} = useSwiper(children, numCardsPreview)
  return (
    <SwiperProvider>
      <div className="swiper-outer-container">
        <div
          className="swiper-container"
          style={{ "--num-cards-preview": numCardsPreview }}
        >
          <PrevCard />
          <div className="swiper-content">
            <Slides>{children}</Slides>
          </div>
          <NextCard />
          <Pagination />
        </div>
      </div>
    </SwiperProvider>
  );
};

export default Swiper;
// const Swiper = ({ children, numCardsPreview }) => {
//   return (
//     <SwiperProvider numCardsPreview={numCardsPreview}>
//       <div className="swiper-outer-container">
//         <div
//           className="swiper-container"
//           style={{ "--num-cards-preview": numCardsPreview }}
//         >
//           <PrevCard />
//           <div className="swiper-content">
//             <Slides>{children}</Slides>
//           </div>
//           <NextCard />
//           <Pagination />
//         </div>
//       </div>
//     </SwiperProvider>
//   );
// };

// export default Swiper;
import { useState } from "react";


//TODO:imporve this file maybe destructure to files




export function useSwiper(children, numCardsPreview) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsPerView = numCardsPreview;
  const totalCards = children.length;

  const getVisibleCards = (children) => {
    let visibleCards = [];
    for (let i = 0; i < cardsPerView; i++) {
      const index = (currentIndex + i) % totalCards;
      visibleCards.push(children[index]);
    }
    return visibleCards;
  };

  const nextCard = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  const prevCard = () => {
    setCurrentIndex((prev) => prev - 1 + totalCards);
  };
  const indexPagination = (index) => setCurrentIndex(index);



  const PrevCard = () => {
    return (
      <button onClick={prevCard} className="nav-button prev-button">
        ❮
      </button>
    );
  };
  const NextCard = () => {
    return (
      <button onClick={nextCard} className="nav-button next-button">
        ❯
      </button>
    );
  };

  const Pagination = () => {
    return (
      <div className="pagination">
        {children.map((_, index) => (
          <button
            key={index}
            className={`dot ${
              currentIndex % children.length === index ? "active" : ""
            }`}
            onClick={() => indexPagination(index)}
          />
        ))}
      </div>
    );
  };

//children with {} is children into 2 elements

  const Slides=({children})=>{
    return (<div className="swiper-slides">{getVisibleCards(children)}</div>)
  }
  

  const Layout = ({children}) => {
    return (
      <div className="swiper-container">
        <div className="swiper-wrapper">
          <Slides children={children}/>
          <PrevCard />
          <NextCard />
        </div>
        <Pagination />
      </div>
    );
  };

  return { Layout };
}
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

export function useRating({
  defaultRating = 0,
  maxRating = 5,
  disabled = false,
  onRatingChange,
  size = "medium",
}) {
  const [rating, setRating] = useState(defaultRating);
  const [hover, setHover] = useState(0);
  const stars = [...Array(maxRating)];
  const isDisabled = disabled;
  const getFontSize = () => {
    switch (size) {
      case "small":
        return "20px";
      case "large":
        return "36px";
      default:
        return "28px";
    }
  };
  const fontSize = getFontSize();

  const handleClick = (value) => {
    if (!disabled) {
      setRating(value);
      console.log(`set rating ${value}`);
      if (onRatingChange) {
        onRatingChange(value);
        console.log(`set rating change ${value}`);
      }
    }
  };

  const isActive = (starValue) => (hover || rating) >= starValue;

  const mouseOnStar = (starValue) => !disabled && setHover(starValue);
  const mouseOffStar = () => !disabled && setHover(0);

  return {
    fontSize,
    handleClick,
    stars,
    mouseOnStar,
    mouseOffStar,
    isActive,
    isDisabled,
  };
}

export function getMomentFromUpdatedAt(updatedAt) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const date = new Date(updatedAt);
  const now = new Date();
  const secondsAgo = Math.floor((now - date) / 1000);
  const minutesAgo = Math.floor(secondsAgo / 60);
  const hoursAgo = Math.floor(minutesAgo / 60);
  const daysAgo = Math.floor(hoursAgo / 24);
  const monthsAgo = Math.floor(daysAgo / 30);
  const yearsAgo = Math.floor(monthsAgo / 12);

  const month = date.getMonth() + 1;
  const monthName = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;
  const formatted24Hours = hours % 24;

  let timeAgo;
  if (secondsAgo < 60) {
    timeAgo = `${secondsAgo} seconds`;
  } else if (minutesAgo < 60) {
    timeAgo = `${minutesAgo} minutes`;
  } else if (hoursAgo < 24) {
    timeAgo = `${hoursAgo} hours`;
  } else if (daysAgo < 30) {
    timeAgo = `${daysAgo} days`;
  } else if (monthsAgo < 12) {
    timeAgo = `${monthsAgo} months`;
  } else {
    timeAgo = `${yearsAgo} years`;
  }
  const theDate = `${day}/${month}/${year}`;
  const theTime = `${formattedHours}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}${ampm}`;
  const theTimeAgo = `${timeAgo} ago`;
  return { theDate, theTime, theTimeAgo, monthName };
}

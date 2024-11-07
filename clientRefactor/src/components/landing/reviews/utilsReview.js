import { useState } from "react";

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

  return { getVisibleCards, nextCard, prevCard, currentIndex, indexPagination };
}

export function useRating({
  defaultRating = 0,
  maxRating = 5,
  disabled = false,
  onRatingChange,
  size = "medium"}
) {
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

  return { fontSize, handleClick, stars, mouseOnStar, mouseOffStar, isActive,isDisabled };
}

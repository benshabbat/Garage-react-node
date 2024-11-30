import { useSwiperContext } from "./SwiperContext";

export default function NextCard() {
  const {nextCard} = useSwiperContext()
  return (
    <button onClick={nextCard} className="nav-button next-button">
      ❯
    </button>
  );
}

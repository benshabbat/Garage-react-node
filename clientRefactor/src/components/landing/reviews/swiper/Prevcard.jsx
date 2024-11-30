import { useSwiperContext } from "./SwiperContext";

export default function PrevCard (){
  const {prevCard} = useSwiperContext()
    return (
      <button onClick={prevCard} className="nav-button prev-button">
        ❮
      </button>
    );
  };

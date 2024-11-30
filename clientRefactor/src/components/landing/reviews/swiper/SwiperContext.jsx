import { createContext, useContext } from "react";

export const SwiperContext = createContext(null);

export const useSwiperContext = () => {
  const context = useContext(SwiperContext);
  if (!context) {
    throw new Error("useSwiperContext must be used within a SwiperProvider");
  }
  return context;
};

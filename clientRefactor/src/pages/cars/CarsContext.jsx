import { createContext, useContext} from "react";

export const CarsContext = createContext(null);

//Provider then
//useCarsContext have the values of logic

export const useCarsContext = () => {
  const context = useContext(CarsContext);
  if (!context) {
    throw new Error("useCarsContext must be used within a CarsProvider");
  }
  return context;
};



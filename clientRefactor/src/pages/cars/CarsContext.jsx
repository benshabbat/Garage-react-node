import { createContext, useContext} from "react";


//TODO:TO CREATE CARSCONTEXT : USECONTEXT AND PROVIDER (useCarsContext , CarsProvider)

export const CarsContext = createContext(null);

export const useCarsContext = () => {
  const context = useContext(CarsContext);
  if (!context) {
    throw new Error("useCarsContext must be used within a CarsProvider");
  }
  return context;
};



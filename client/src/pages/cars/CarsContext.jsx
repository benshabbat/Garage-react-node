import { createContext } from "react";
import { createContextHook } from "../../components/context/useContextGeneric";

export const CarsContext = createContext(null);

//Provider then
//useCarsContext have the values of logic
export const useCarsContext = createContextHook(CarsContext, "useCarsContext");

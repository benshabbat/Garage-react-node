import { createContext } from "react";
import { createContextHook } from "../context/useContextGeneric";

export const HeaderContext = createContext(null);

export const useHeaderContext = createContextHook(HeaderContext, "useHeaderContext");

import { createContext } from "react";
import { createContextHook } from "../../components/context/useContextGeneric";

export const DashboardContext = createContext(null);

export const useDashboardContext = createContextHook(
  DashboardContext,
  "useDashboardContext"
);

import { createContext } from "react";
import { createContextHook } from "../../components/context/useContextGeneric";

export const AppointmentsContext = createContext(null);

export const useAppointmentsContext = createContextHook(
  AppointmentsContext,
  "useAppointmentsContext"
);

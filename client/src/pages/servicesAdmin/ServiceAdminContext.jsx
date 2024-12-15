import { createContext } from "react";
import { createContextHook } from "../../components/context/useContextGeneric";

export const ServiceAdminContext = createContext(null)

export const useServicesAdminContext = createContextHook(ServiceAdminContext, "useServicesAdminContext");
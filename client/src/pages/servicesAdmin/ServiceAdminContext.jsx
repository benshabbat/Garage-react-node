import { createContext,useContext } from "react";

export const ServiceAdminContext = createContext(null)

export const useServicesAdminContext = ()=>{
    const context = useContext(ServiceAdminContext)
    if(!context){
        throw new Error("useServiceAdminContext must be used within a ServiceAdminProvider")
    }
    return context;
}
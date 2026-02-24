import { createContext } from "react";
import { createContextHook } from "../../components/context/useContextGeneric";

export const AccountContext = createContext(null);

export const useAccountContext = createContextHook(AccountContext, "useAccountContext");


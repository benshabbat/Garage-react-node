import { createContext } from "react";
import { createContextHook } from "../../components/context/useContextGeneric";

export const UsersContext = createContext(null);

export const useUsersContext = createContextHook(UsersContext, "useUsersContext");
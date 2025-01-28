import { createContext } from "react";
import { createContextHook } from "../../components/context/useContextGeneric";

export const MessagesContext = createContext(null);
export const useMessagesContext = createContextHook(MessagesContext, "useMessagesContext");


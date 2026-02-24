import { createContext } from "react";
import { createContextHook } from "../../components/context/useContextGeneric";

export const MsgOfContactContext = createContext(null);

export const useMsgOfContactContext = createContextHook(MsgOfContactContext, "useMsgOfContactContext");

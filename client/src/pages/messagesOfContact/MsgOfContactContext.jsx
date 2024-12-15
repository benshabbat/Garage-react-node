import { createContext, useContext } from "react";

export const MsgOfContactContext = createContext(null);

export function useMsgOfContactContext(){
    const context = useContext(MsgOfContactContext);
    if (!context) {
      throw new Error("useMsgOfContactContext must be used within a MsgOfContactProvider");
    }
    return context;
}

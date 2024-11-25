import { createContext, useContext } from "react";

export const UsersContext = createContext(null);

export function useUsersContext(){
    const context = useContext(UsersContext);
    if (!context) {
      throw new Error("useUsersContext must be used within a UsersProvider");
    }
    return context;
}

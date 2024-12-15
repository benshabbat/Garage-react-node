import { createContext, useContext } from "react";

export const MessagesContext = createContext(null);

export const useContextMessages = () => {
  const context = useContext(MessagesContext);
  if (!context) {
    throw new Error(
      "useContextMessage must be used within a MessagessProvider"
    );
  }
  return context;
};

import { useContext } from "react";

export const createContextHook = (context, contextName) => {
  return () => {
    const dataContext = useContext(context);
    if (!dataContext) {
      throw new Error(`${contextName} must be used within its Provider`);
    }
    return dataContext;
  };
};


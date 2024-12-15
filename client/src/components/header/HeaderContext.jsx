import { createContext, useContext } from "react";

export const HeaderContext = createContext(null);

export const useHeaderContext = () => {
  const context = useContext(HeaderContext);
  if (!context) {
    throw new Error("useHeaderContext must be used within a HeaderProvider");
  }

  return context;
};

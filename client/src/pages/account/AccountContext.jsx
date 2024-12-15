import { createContext, useContext} from "react";

//TODO: TO USE WITH HOOK CONTEXT GENERIC
export const AccountContext = createContext(null);

export const useAccountContext = () => {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error("useAccountContext must be used within a AccountProvider");
  }
  return context;
};


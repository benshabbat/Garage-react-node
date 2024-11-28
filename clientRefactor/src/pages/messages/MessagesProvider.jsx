import { MessagesContext } from "./MessagesConetxt";

export default function MessagesProvider({children}) {

const value={

}


  return <MessagesContext.Provider value={value}>{children}</MessagesContext.Provider>

}

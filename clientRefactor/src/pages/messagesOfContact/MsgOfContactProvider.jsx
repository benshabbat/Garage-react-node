import { MsgOfContactContext } from "./MsgOfContactContext"

export default function MsgOfContactProvider({children}) {
const value = {}
return <MsgOfContactContext.Provider value={value}>{children}</MsgOfContactContext.Provider>
}

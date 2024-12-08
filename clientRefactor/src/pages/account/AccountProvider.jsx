import { AccountContext } from "./AccountContext"

export default function AccountProvider({children}) {
const value={}
return <AccountContext.Provider value={value}>{children}</AccountContext.Provider>
}

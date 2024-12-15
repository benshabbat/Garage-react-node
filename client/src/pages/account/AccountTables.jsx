import AccountTable from "./AccountTable";
import AccountServices from "./AccountServices";
import { useAccountContext } from "./AccountContext";
export default function AccountTables() {
  const { isOpenServices } = useAccountContext();
  return <>{isOpenServices ? <AccountServices /> : <AccountTable />}</>;
}

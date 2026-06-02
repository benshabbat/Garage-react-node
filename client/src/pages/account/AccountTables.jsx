import AccountTable from "./AccountTable";
import AccountServices from "./AccountServices";
import { useAccountUIStore } from "../../stores/uiStores";
export default function AccountTables() {
  const servicesOpen = useAccountUIStore((s) => s.servicesOpen);
  return <>{servicesOpen ? <AccountServices /> : <AccountTable />}</>;
}

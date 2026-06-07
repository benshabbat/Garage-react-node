import AccountTable from "./AccountTable";
import AccountServices from "./AccountServices";
import { useAccountUIStore } from "../../stores/uiStores";

export default function AccountTables() {
  const servicesOpen = useAccountUIStore((s) => s.servicesOpen);
  const toggleServices = useAccountUIStore((s) => s.toggleServices);

  return (
    <>
      {servicesOpen && (
        <button
          className="back-btn"
          onClick={toggleServices}
          aria-label="Back to My Cars"
        >
          ← Back to My Cars
        </button>
      )}
      {servicesOpen ? <AccountServices /> : <AccountTable />}
    </>
  );
}

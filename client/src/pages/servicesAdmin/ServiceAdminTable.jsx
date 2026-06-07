import Search from "../../components/table/Search";
import Table from "../../components/table/Table";
import { useServiceAdminTableRows } from "./hooks/useServiceAdminTableRows";

export default function ServiceAdminTable() {
  const { trTh, trTd, handleSearch, handleExport } = useServiceAdminTableRows();

  return (
    <div className="table-container">
      <Search handleSearch={handleSearch} name={"Services"} onExport={handleExport} />
      <Table trTh={trTh} trTd={trTd} />
    </div>
  );
}

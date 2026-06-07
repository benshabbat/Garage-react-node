import "../../components/table/table.css";
import Search from "../../components/table/Search";
import Table from "../../components/table/TableWithSort";
import { useMsgOfContactTableRows } from "./hooks/useMsgOfContactTableRows";

export default function MsgOfContactTable() {
  const { trTh, trTd, handleSearch, handleExport } = useMsgOfContactTableRows();

  return (
    <div className="table-container">
      <Search handleSearch={handleSearch} name={"Message of Contacts"} onExport={handleExport} />
      <Table trTh={trTh} trTd={trTd} />
    </div>
  );
}

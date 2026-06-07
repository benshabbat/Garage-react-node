import Search from "../../components/table/Search";
import Table from "../../components/table/TableWithSort";
import { useMessagesTableRows } from "./hooks/useMessagesTableRows";

export default function MessagesTable() {
  const { trTh, trTd, handleSearch, toggleCreateMsg, handleExport } = useMessagesTableRows();

  return (
    <div className="table-container">
      <Search handleSearch={handleSearch} name={"Messages"} onExport={handleExport} />
      <Table trTh={trTh} trTd={trTd} />
      <button onClick={toggleCreateMsg} className="create-button">
        Create Message
      </button>
    </div>
  );
}

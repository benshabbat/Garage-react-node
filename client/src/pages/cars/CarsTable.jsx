import Search from "../../components/table/Search";
import Table from "../../components/table/Table";
import { useCarsTableRows } from "./hooks/useCarsTableRows";

export default function CarsTable() {
  const { trTh, trTd, handleSearch, handleExport } = useCarsTableRows();

  return (
    <div className="table-container">
      <Search handleSearch={handleSearch} name={"Cars"} onExport={handleExport} />
      <Table trTh={trTh} trTd={trTd} />
    </div>
  );
}

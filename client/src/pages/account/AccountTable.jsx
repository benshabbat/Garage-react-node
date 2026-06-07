import Search from "../../components/table/Search";
import Table from "../../components/table/Table";
import { useAccountTableRows } from "./hooks/useAccountTableRows";

export default function AccountTable() {
  const { trTh, trTd, handleSearch } = useAccountTableRows();

  return (
    <div className="table-container">
      <Search handleSearch={handleSearch} name={"My Cars"} />
      <Table trTh={trTh} trTd={trTd} />
    </div>
  );
}

import Search from "../../components/table/Search";
import Table from "../../components/table/Table";
import { useUsersTableRows } from "./hooks/useUsersTableRows";

export default function UsersTable() {
  const { trTh, trTd, handleSearch, toggleCreateUser, handleExport } = useUsersTableRows();

  return (
    <div className="table-container">
      <Search handleSearch={handleSearch} name={"Users"} onExport={handleExport} />
      <Table trTh={trTh} trTd={trTd} />
      <button onClick={toggleCreateUser} className="create-button">
        Create User
      </button>
    </div>
  );
}

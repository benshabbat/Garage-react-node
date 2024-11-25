import { useUsersContext } from "./UsersContext";

export default function Search() {
  const { handleSearch, handleCreateUser } = useUsersContext();
  return (
    <section className="table__header">
      <h1>Users</h1>
      <div className="input-group">
        <input
          type="search"
          placeholder="Search Data..."
          onChange={handleSearch}
        />
      </div>
      <button onClick={handleCreateUser} className="create-button">
        Create User
      </button>
    </section>
  );
}

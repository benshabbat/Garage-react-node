import { useServicesAdminContext } from "./ServiceAdminContext";

export default function Search() {
    const {handleSearch} = useServicesAdminContext()
  return (
    <section className="table__header">
      <h1>Services</h1>
      <div className="input-group">
        <input
          type="search"
          placeholder="Search Data..."
          onChange={handleSearch}
        />
      </div>
    </section>
  );
}

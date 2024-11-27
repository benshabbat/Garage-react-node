export default function Search() {
  return (
    <section className="table__header">
      <h1>Services</h1>
      <div className="input-group">
        <input
          type="search"
          placeholder="Search Data..."
          onChange={filterSearch}
        />
      </div>
    </section>
  );
}

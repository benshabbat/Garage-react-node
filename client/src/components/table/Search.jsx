

export default function Search({name,handleSearch}) {
  return (
    <section className="table__header">
      <h1>{name}</h1>
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
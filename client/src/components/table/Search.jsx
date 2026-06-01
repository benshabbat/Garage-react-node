import PropTypes from "prop-types";

export default function Search({ name, handleSearch, onExport }) {
  return (
    <section className="table__header">
      <h1>{name}</h1>
      <div className="input-group">
        <input
          type="search"
          placeholder="Search Data..."
          onChange={handleSearch}
        />
        {onExport && (
          <button className="export-btn" onClick={onExport} title="Export to CSV">
            ⬇ Export CSV
          </button>
        )}
      </div>
    </section>
  );
}

Search.propTypes = {
  name: PropTypes.string.isRequired,
  handleSearch: PropTypes.func.isRequired,
  onExport: PropTypes.func,
};
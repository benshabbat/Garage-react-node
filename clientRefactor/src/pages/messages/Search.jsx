
export default function Search() {
  return (
    <section className="table__header">
    <h1>Messages</h1>
    <div className="input-group">
      <input
        type="search"
        placeholder="Search messages..."
        onChange={filterSearch}
      />
    </div>
    <button onClick={handleCreateMessage} className="create-button">
      New Message
    </button>
  </section>
  )
}

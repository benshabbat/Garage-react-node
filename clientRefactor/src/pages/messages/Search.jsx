import { useContextMessages } from "./MessagesConetxt"

export default function Search() {
  const { modals,handleSearch } = useContextMessages()
  return (
    <section className="table__header">
    <h1>Messages</h1>
    <div className="input-group">
      <input
        type="search"
        placeholder="Search messages..."
        onChange={handleSearch}
      />
    </div>
    <button onClick={modals.createMsg.handel} className="create-button">
      New Message
    </button>
  </section>
  )
}

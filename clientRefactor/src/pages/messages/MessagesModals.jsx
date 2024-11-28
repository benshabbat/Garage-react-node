import CreateMessage from "../../components/create/CreateMessage";
export default function MessagesModals() {
  return (
    <CreateMessage
    handelClick={handleCreateMessage}
    isOpen={isOpenCreateMessage}
    user={user}
    users={user?.isAdmin ? users : null}
  />
  )
}

import CreateMessage from "../../components/create/CreateMessage";
import { useContextMessages } from "./MessagesConetxt";
export default function MessagesModals() {
  const { modals,user,users } = useContextMessages()
  return (
    <CreateMessage
    handelClick={modals.createMsg.onClose}
    isOpen={modals.createMsg.isOpen}
    user={user}
    users={user?.isAdmin ? users : null}
  />
  )
}

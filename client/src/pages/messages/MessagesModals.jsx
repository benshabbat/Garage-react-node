import CreateMessage from "../../components/create/CreateMessage";
import DeleteMessage from "../../components/delete/DeleteMessage";
export default function MessagesModals() {

    

  //TODO: ADD POP UP When created, created service with sign v
  //TODO: ADD POP UP When edited, edited (type,data,(maybe prevdata)) with sign v
  //TODO: ADD POP UP When deleted, deleted the user with sign v
  return (
    <>
      <CreateMessage />
      <DeleteMessage />
    </>
  );
}

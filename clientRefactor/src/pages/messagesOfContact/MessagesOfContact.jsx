import MsgOfContactProvider from "./MsgOfContactProvider";
import MsgOfContactTable from "./MsgOfContactTable";

//TODO:FIX TYPES
//TODO:FIX DATA
//TODO:FIX SERVER REQUESTS
//TODO:FIX FORM
//TODO:DELETE THE DATA WORNGS
export default function MessagesOfContact() {
  return (
    <MsgOfContactProvider>
      <MsgOfContactTable />
    </MsgOfContactProvider>
  );
}

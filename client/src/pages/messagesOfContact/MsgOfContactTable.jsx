import Search from "../../components/table/Search";
import Table from "../../components/table/TableWithSort";
import { getMomentFromUpdatedAt} from "../../utils";
import { useMsgOfContactContext } from "./MsgOfContactContext";
export default function MsgOfContactTable() {
  const { handleSearch, displayContacts,handleContact } = useMsgOfContactContext();
  const trTh = (
    <tr>
      <th></th>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Email</th>
      <th>Phone</th>
      <th>Message</th>
      <th>Date</th>
    </tr>
  );


  const trTd = displayContacts?.map((message) => {
    const { theDate } = getMomentFromUpdatedAt(message.updatedAt);
    return (
      <tr key={message._id}>
        <td><button value={message._id}  name="deleteContact" onClick={handleContact} >Delete</button></td>
        <td data-label="First Name">{message.firstName}</td>
        <td data-label="Last Name">{message.lastName}</td>
        <td data-label="Email">{message.email}</td>
        <td data-label="Phone">{message.phone}</td>
        <td data-label="Message">{message.message}</td>
        <td data-label="Date">{theDate}</td>
      </tr>
    );
  });
  return (
    <div className="table-container">
      <Search handleSearch={handleSearch} name={"Message of Contacts"} />
      <Table trTh={trTh} trTd={trTd} />
    </div>
  );
}

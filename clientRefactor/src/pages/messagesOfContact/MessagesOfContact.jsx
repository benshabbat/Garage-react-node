import "../components/table/table.css";
import { useState, useEffect } from "react";
import { getContacts, getMomentFromUpdatedAt } from "../../utils";



//TODO:CONTEXT
//TODO:FIX TYPES
//TODO:FIX DATA
//TODO:FIX SERVER REQUESTS
//TODO:FIX FORM
//TODO:DELETE THE DATA WORNGS
export default function MessagesOfContact() {
  const [contacts, setContacts] = useState();
  const [filterContacts, setFilterContacts] = useState();

  useEffect(() => {
    const getData = async () => {
      const { data } = await getContacts();
      setContacts(data);
    };
    getData();
  }, []);

  const filterSearch = (e) => {
    const { value } = e.target;
    setFilterContacts(
      contacts?.filter(item => 
        [item.firstName, item.lastName, item.email,item.phone,item.message]
          .some(field => field?.toLowerCase().includes(value.toLowerCase()))
      )
    );
  };

  const MessageRow = ({ message }) => {
    const { theDate } = getMomentFromUpdatedAt(message.updatedAt);
    return (
      <tr key={message._id}>
        <td data-label="First Name">{message.firstName}</td>
        <td data-label="Last Name">{message.lastName}</td>
        <td data-label="Email">{message.email}</td>
        <td data-label="Phone">{message.phone}</td>
        <td data-label="Message">{message.message}</td>
        <td data-label="Date">{theDate}</td>
      </tr>
    );
  };

  return (
    <div className="table-container">
      <section className="table__header">
        <h1>Messages From Contact</h1>
        <div className="input-group">
          <input
            type="search"
            placeholder="Search in messages..."
            onChange={filterSearch}
          />
        </div>
      </section>
      <section className="table__body">
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Message</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {(filterContacts || contacts)?.map(message => 
              <MessageRow key={message._id} message={message} />
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
}
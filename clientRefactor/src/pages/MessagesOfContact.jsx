import "../components/table/table.css";
import { useState, useEffect } from "react";
import { getContacts, getMomentFromUpdatedAt } from "../utils";



//TODO:CONTEXT
//TODO:FIX TYPES
//TODO:FIX DATA
//TODO:FIX SERVER REQUESTS
//TODO:FIX FORM
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
        [item.from, item.subject, item.message]
          .some(field => field?.toLowerCase().includes(value.toLowerCase()))
      )
    );
  };

  const MessageRow = ({ message }) => {
    const { theDate } = getMomentFromUpdatedAt(message.updatedAt);
    return (
      <tr key={message._id}>
        <td data-label="From">{message.from}</td>
        <td data-label="Subject">{message.subject}</td>
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
              <th>From</th>
              <th>Subject</th>
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
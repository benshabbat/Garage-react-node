import "../components/table/table.css";
import { useState, useEffect } from "react";
import { getContacts,getMomentFromUpdatedAt } from "../utils";


//TODO:MAYBE TO ADD PHONE

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
      contacts.filter(
        (item) =>
          item?.from.includes(value) ||
          item?.subject.includes(value) ||
          item?.message.includes(value)
          // item?.updatedAt.includes(value)// need to check how to include
      )
    );
  };
  const bodyMessagesContact = (message) => {
    const { theDate } = getMomentFromUpdatedAt(message.updatedAt);
    return (
      <tr key={message?._id}>
        <td>{message?.from}</td>
        <td>{message?.subject}</td>
        <td>{message?.message}</td>
        <td>{theDate}</td>
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
            placeholder="Search Data..."
            onChange={filterSearch}
          />
        </div>
      </section>
      <section className="table__body">
        <table>
          <thead>
            <tr>
              <th>from</th>
              <th>subject</th>
              <th>message</th>
              <th>date</th>
            </tr>
          </thead>
          <tbody>
            {filterContacts
              ? filterContacts.map(bodyMessagesContact)
              : contacts?.map(bodyMessagesContact)}
          </tbody>
        </table>
      </section>
    </div>
  );
}

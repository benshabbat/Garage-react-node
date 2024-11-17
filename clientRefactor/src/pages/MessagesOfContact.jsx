import "../components/table/table.css";
import { useState, useEffect } from "react";
import { getContacts } from "../utils";
import { getMomentFromUpdatedAt } from "../components/landing/reviews/utilsReview";

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
          item?.message.includes(value) ||
          // item?.updatedAt.includes(value)
      )
    );
  };
  const bodyMessages = (message) => {
    const { theTimeAgo, theDate } = getMomentFromUpdatedAt(message.updatedAt);
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
              ? filterContacts.map(bodyMessages)
              : contacts?.map(bodyMessages)}
          </tbody>
        </table>
      </section>
    </div>
  );
}

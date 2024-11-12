import "../../components/table/table.css";
import { useState, useEffect } from "react";
import CreateMessage from "../../components/create/CreateMessage";
import useOpenModel from "../../hooks/useOpenModel";
import { useDispatch, useSelector } from "react-redux";
import { getMessagesByIdUser } from "../../features/user/userSlice";

export function useMessages() {
  const { messages, user } = useSelector((state) => state.user);
  const { users } = useSelector((state) => state.admin);
  const [handleCreateMessage, isOpenCreateMessage] = useOpenModel();
  const [filterMessages, setFilterMessages] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    if (user) dispatch(getMessagesByIdUser(user?._id));
  }, [user, isOpenCreateMessage, dispatch]);
  const filterSearch = (e) => {
    const { value } = e.target;
    setFilterMessages(
      messages.filter(
        (item) =>
          item?.from?.username.includes(value) ||
          item?.to?.username.includes(value) ||
          item?.title.includes(value) ||
          item?.description.includes(value) ||
          item?.updatedAt.includes(value)
      )
    );
  };
  const bodyMessages = (message) => {
    return (
      <tr key={message?._id}>
        <td>{message?.from?.username}</td>
        <td>{message?.to?.username}</td>
        <td>{message?.title}</td>
        <td>{message?.description}</td>
        <td>{message?.updatedAt}</td>
      </tr>
    );
  };

  function Search() {
    return (
      <section className="table__header">
        <h1>Messages</h1>
        <div className="input-group">
          <input
            type="search"
            placeholder="Search Data..."
            onChange={filterSearch}
          />
        </div>
      </section>
    );
  }

  function TableMessages() {
    return (
      <>
        <section className="table__body">
          <table>
            <thead>
              <tr>
                <th>from</th>
                <th>to</th>
                <th>title</th>
                <th>description</th>
                <th>date</th>
              </tr>
            </thead>
            <tbody>
              {filterMessages
                ? filterMessages?.map(bodyMessages)
                : messages?.map(bodyMessages)}
            </tbody>
          </table>
        </section>
        <button onClick={handleCreateMessage}>New Message</button>
      </>
    );
  }
  function PageMessages() {
    return (
      <>
        <div className="table-container">
          {Search()}
          <TableMessages />
        </div>
        {/* why i need the condition */}
        {user && (
          <CreateMessage
            handelClick={handleCreateMessage}
            isOpen={isOpenCreateMessage}
            user={user}
            users={user?.isAdmin ? users : null}
          />
        )}
      </>
    );
  }
  return {PageMessages};
}

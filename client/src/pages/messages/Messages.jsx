import "../../components/table/table.css";
import React, { useState, useEffect } from "react";
import CreateMessage from "../../components/create/CreateMessage";
import useOpenModel from "../../hooks/useOpenModel";
import { useDispatch } from "react-redux";
import { getMessagesByIdUser } from "../../features/user/userSlice";
const Messages = ({ messages = null, user, users = null }) => {
  const [handleCreateMessage, isOpenCreateMessage] = useOpenModel();
  const [filterMessages, setFilterMessages] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMessagesByIdUser(user?._id));
  }, []);
  const filterSearch = (e) => {
    const { value } = e.target;
    setFilterMessages(
      messages.filter(
        (item) =>
          item?.from?.username.includes(value) ||
          item?.to?.username.includes(value) ||
          item?.title.includes(value) ||
          item?.description.includes(value)||
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
  return (
    <>
      <div className="table-container">
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
      </div>
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
};

export default Messages;

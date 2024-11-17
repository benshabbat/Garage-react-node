import "../../components/table/table.css";
import { useState, useEffect } from "react";
import CreateMessage from "../../components/create/CreateMessage";
import useOpenModel from "../../hooks/useOpenModel";
import { useDispatch, useSelector } from "react-redux";
import { getMessagesByIdUser } from "../../features/user/userSlice";
import { getUsers } from "../../features/admin/adminSlice";
import { deleteMessage } from "../../utils";

export function useMessages() {
  const { messages, user } = useSelector((state) => state.user);
  const { users } = useSelector((state) => state.admin);
  const [handleCreateMessage, isOpenCreateMessage] = useOpenModel();
  const [filterMessages, setFilterMessages] = useState();
  const [isDeleted, setIsDeleted] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    if (user?.isAdmin) dispatch(getUsers());
    if (user) dispatch(getMessagesByIdUser(user?._id));
  }, [user, isOpenCreateMessage, dispatch, isDeleted]);

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

  const bodyMessages = (message) => {
    return (
      <tr key={message?._id}>
        {user?.isAdmin && (
          <td>
            <button
              name="deleteMessage"
              value={message?._id}
              onClick={handleDelete}
            >
              Delete
            </button>
          </td>
        )}
        <td>{message?.from?.username}</td>
        <td>{message?.to?.username}</td>
        <td>{message?.title}</td>
        <td>{message?.description}</td>
        <td>{message?.updatedAt}</td>
      </tr>
    );
  };

  const handleDelete = async (e) => {
    const { name, value } = e.target;
    if (name === "deleteMessage") {
      await deleteMessage(value);
      setIsDeleted(true);
    }
  };

  function TableMessages() {
    return (
      <>
        <section className="table__body">
          <table>
            <thead>
              <tr>
                {user?.isAdmin && <th>delete</th>}
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
        <CreateMessage
          handelClick={handleCreateMessage}
          isOpen={isOpenCreateMessage}
          user={user}
          users={user?.isAdmin ? users : null}
        />
      </>
    );
  }

  // want to use with layout
  function LayoutMessages({ children }) {
    return (
      <>
        <div className="table-container">
          {Search()}
          {children}
        </div>
        <CreateMessage
          handelClick={handleCreateMessage}
          isOpen={isOpenCreateMessage}
          user={user}
          users={user?.isAdmin ? users : null}
        />
      </>
    );
  }
  return { PageMessages, TableMessages, Search, LayoutMessages };
}

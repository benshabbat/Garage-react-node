import "../../components/table/table.css";
import { useState, useEffect } from "react";
import CreateMessage from "../../components/create/CreateMessage";
import useOpenModel from "../../hooks/useOpenModel";
import { useDispatch, useSelector } from "react-redux";
import { getMessagesByIdUser } from "../../features/user/userSlice";
import { getUsers } from "../../features/admin/adminSlice";
import { deleteMessage } from "../../utils";
//TODO: to make context for messages
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
  }, [user, isOpenCreateMessage, isDeleted]);

  const filterSearch = (e) => {
    setFilterMessages(
      messages?.filter(item => 
        Object.values({
          username: item?.from?.username,
          toUsername: item?.to?.username,
          title: item?.title,
          description: item?.description,
          date: item?.updatedAt
        }).some(value => value?.toLowerCase().includes(e.target.value.toLowerCase()))
      )
    );
  };

  const handleDelete = async (messageId) => {
    await deleteMessage(messageId);
    setIsDeleted(prev => !prev);
  };

  const MessageRow = ({ message }) => (
    <tr key={message?._id}>
      {user?.isAdmin && (
        <td data-label="Actions">
          <button
            name="deleteMessage"
            onClick={() => handleDelete(message?._id)}
          >
            Delete
          </button>
        </td>
      )}
      <td data-label="From">{message?.from?.username}</td>
      <td data-label="To">{message?.to?.username}</td>
      <td data-label="Title">{message?.title}</td>
      <td data-label="Description">{message?.description}</td>
      <td data-label="Date">{message?.updatedAt}</td>
    </tr>
  );

  const Search = () => (
    <section className="table__header">
      <h1>Messages</h1>
      <div className="input-group">
        <input
          type="search"
          placeholder="Search messages..."
          onChange={filterSearch}
        />
      </div>
      <button onClick={handleCreateMessage} className="create-button">
        New Message
      </button>
    </section>
  );

  const TableMessages = () => (
    <section className="table__body">
      <table>
        <thead>
          <tr>
            {user?.isAdmin && <th>Actions</th>}
            <th>From</th>
            <th>To</th>
            <th>Title</th>
            <th>Description</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {(filterMessages || messages)?.map(message => 
            <MessageRow key={message._id} message={message} />
          )}
        </tbody>
      </table>
    </section>
  );

  const PageMessages = () => (
    <>
      <div className="table-container">
        <Search />
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

  const LayoutMessages = ({ children }) => (
    <>
      <div className="table-container">
        <Search />
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

  return { PageMessages, TableMessages, Search, LayoutMessages };
}
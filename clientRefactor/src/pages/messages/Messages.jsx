import MessagesModals from "./MessagesModals";
import MessagesProvider from "./MessagesProvider";
import MessagesTable from "./MessagesTable";
import Search from "./Search";

const Messages = () => {
  return (
    <MessagesProvider>
      <div className="table-container">
        <Search/>
        <MessagesTable/>
      </div>
      <MessagesModals/>
    </MessagesProvider>
  );
};

export default Messages;

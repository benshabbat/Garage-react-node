import MessagesModals from "./MessagesModals";
import MessagesProvider from "./MessagesProvider";
import MessagesTable from "./MessagesTable";
import Search from "./Search";

//TODO: TO USE WITH TABLE AND SEARCH GENERIC
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

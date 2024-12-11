import MessagesModals from "./MessagesModals";
import MessagesProvider from "./MessagesProvider";
import MessagesTable from "./MessagesTable";

//TODO: TO USE WITH TABLE AND SEARCH GENERIC
const Messages = () => {
  return (
    <MessagesProvider>
      <MessagesTable />
      <MessagesModals />
    </MessagesProvider>
  );
};

export default Messages;

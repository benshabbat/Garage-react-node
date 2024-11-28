import { useMessages } from "./utilsMessages";
//TODO: to make context for messages
const Messages = () => {
  const { PageMessages } = useMessages();
  return PageMessages();
};

export default Messages;

import { useMessages } from "./utilsMessages";

const Messages = () => {
  const { PageMessages } = useMessages();
  return PageMessages();
};

export default Messages;

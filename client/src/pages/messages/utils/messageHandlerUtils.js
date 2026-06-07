import { resolveActionTarget } from "../../../utils/handlerUtils";

export const handleMessageAction = (
  e,
  messages,
  setSelectedMsg,
  { toggleCreateMsg, toggleDeleteMsg }
) => {
  const name = resolveActionTarget(e, messages, setSelectedMsg);
  switch (name) {
    case "createMessage":
      toggleCreateMsg();
      break;
    case "deleteMessage":
      toggleDeleteMsg();
      break;
  }
};

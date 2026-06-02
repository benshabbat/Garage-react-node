import { resolveActionTarget } from "../../../utils/handlerUtils";

export const handleMessageAction = (e, messages, setSelectedMsg, modals) => {
  const name = resolveActionTarget(e, messages, setSelectedMsg);

  switch (name) {
    case "createMessage":
      modals.createMsg.handle();
      break;
    case "deleteMessage":
      modals.deleteMsg.handle();
      break;
  }
};

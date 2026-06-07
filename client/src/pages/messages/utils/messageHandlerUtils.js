import { createActionHandler } from "../../../utils/handlerUtils";

export const handleMessageAction = createActionHandler({
  createMessage: "toggleCreateMsg",
  deleteMessage: "toggleDeleteMsg",
});

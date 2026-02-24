/**
 * Handle message actions based on button click
 * @param {Event} e - Event object
 * @param {Array} messages - List of messages
 * @param {Function} setSelectedMsg - Function to set selected message
 * @param {Object} modals - Modal handlers
 */
export const handleMessageAction = (e, messages, setSelectedMsg, modals) => {
  e.preventDefault();
  const { name, value } = e.target;
  const message = messages.find((message) => message._id === value);
  setSelectedMsg(message);

  switch (name) {
    case "createMessage":
      modals.createMsg.handle();
      break;
    case "deleteMessage":
      modals.deleteMsg.handle();
      break;
  }
};

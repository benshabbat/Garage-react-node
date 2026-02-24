/**
 * Handle user actions based on button click
 * @param {Event} e - Event object
 * @param {Array} users - List of users
 * @param {Function} setSelectedUser - Function to set selected user
 * @param {Object} modals - Modal handlers
 */
export const handleUserAction = async (e, users, setSelectedUser, modals) => {
  e.preventDefault();

  const { value, name } = e.target;
  setSelectedUser(users.find((user) => user._id === value));

  switch (name) {
    case "editUser":
      modals.editUser.handle();
      break;
    case "createCar":
      modals.createCar.handle();
      break;
    case "deleteUser":
      modals.deleteUser.handle();
      break;
    default:
      modals.manageUser.handle();
  }
};

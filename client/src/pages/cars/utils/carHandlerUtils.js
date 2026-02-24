/**
 * Handle car actions based on button click
 * @param {Event} e - Event object
 * @param {Array} cars - List of cars
 * @param {Function} setSelectedCar - Function to set selected car
 * @param {Object} modals - Modal handlers
 */
export const handleCarAction = (e, cars, setSelectedCar, modals) => {
  e.preventDefault();
  const { name, value } = e.target;
  const car = cars.find((car) => car._id === value);
  setSelectedCar(car);

  switch (name) {
    case "editCar":
      modals.editCar.handle();
      break;
    case "createService":
      modals.createService.handle();
      break;
    case "deleteCar":
      modals.deleteCar.handle();
      break;
    default:
      modals.manageCar.handle();
  }
};

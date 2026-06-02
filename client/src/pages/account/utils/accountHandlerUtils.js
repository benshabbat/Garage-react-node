/**
 * Handle car/account actions based on button click
 * @param {Event} e - Event object
 * @param {Array} cars - List of cars
 * @param {Function} setSelectedCar - Function to set selected car
 * @param {Object} modals - Modal handlers
 */
export const handleCarAction = (
  e,
  cars,
  setSelectedCar,
  { toggleReqService, toggleServices }
) => {
  const { value, name } = e.target;
  setSelectedCar(cars.find((car) => car._id === value));
  if (name === "req-services") toggleReqService();
  if (name === "services")     toggleServices();
};

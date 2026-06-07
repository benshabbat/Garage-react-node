import { resolveActionTarget } from "../../../utils/handlerUtils";

export const handleCarAction = (
  e,
  cars,
  setSelectedCar,
  { toggleManageCar, toggleEditCar, toggleCreateService, toggleDeleteCar }
) => {
  const name = resolveActionTarget(e, cars, setSelectedCar);
  switch (name) {
    case "editCar":
      toggleEditCar();
      break;
    case "createService":
      toggleCreateService();
      break;
    case "deleteCar":
      toggleDeleteCar();
      break;
    default:
      toggleManageCar();
  }
};

import { resolveActionTarget } from "../../../utils/handlerUtils";

export const handleCarAction = (e, cars, setSelectedCar, modals) => {
  const name = resolveActionTarget(e, cars, setSelectedCar);

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

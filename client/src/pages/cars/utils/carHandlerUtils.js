import { createActionHandler } from "../../../utils/handlerUtils";

export const handleCarAction = createActionHandler(
  { editCar: "toggleEditCar", createService: "toggleCreateService", deleteCar: "toggleDeleteCar" },
  "toggleManageCar"
);

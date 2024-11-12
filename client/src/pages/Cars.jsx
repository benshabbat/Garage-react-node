import "../components/table/table.css";

import { useCars } from "./utilsCars";

const Cars = () => {
  const { PageCars } = useCars();
// will want to know why with parentheses and cant to write as component
  return PageCars();
};

export default Cars;

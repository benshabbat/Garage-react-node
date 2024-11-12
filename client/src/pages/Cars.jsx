import "../components/table/table.css";

import { useCars } from "./utilsCars";

const Cars = () => {
  const { PageCars } = useCars();

  return PageCars();
};

export default Cars;

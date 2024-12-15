import CarsProvider from "./CarsProvider";
import CarsTable from "./CarsTable";
import CarModals from "./CarModals";

const Cars = () => {
  return (
    <CarsProvider>
      <CarsTable />
      <CarModals />
    </CarsProvider>
  );
};

export default Cars;

import CarsProvider from "./CarsProvider";
import CarsTable from "./CarsTable";
import Search from "./Search";
import CarModals from "./CarModals";

const Cars = () => {
  return (
    <CarsProvider>
      <div className="table-container">
        <Search />
        <CarsTable />
      </div>
      <CarModals />
    </CarsProvider>
  );
};

export default Cars;

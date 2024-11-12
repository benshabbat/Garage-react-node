import "../components/table/table.css";


import { useCars } from "./utilsCars";

//TODO: to move logic to external file
const Cars = () => {
  const {
    TableCars,
    filterSearch,
    HandelCars,
  } = useCars();

  return (
    <>
      <div className="table-container">
        <section className="table__header">
          <h1>Cars</h1>
          <div className="input-group">
            <input
              type="search"
              placeholder="Search Data..."
              onChange={filterSearch}
            />
          </div>
        </section>
        <TableCars />
      </div>
      <HandelCars/>
    </>
  );
};

export default Cars;

import { useCarsContext } from "./CarsContext";

//TODO:NEED TO CREATE GET DATA FROM USECONTEXT CAR
export default function Search() {
  const { handleSearch } = useCarsContext();
  return (
    <section className="table__header">
      <h1>Cars</h1>
      <div className="input-group">
        <input
          type="search"
          placeholder="Search Data..."
          onChange={handleSearch}
        />
      </div>
    </section>
  );
}

import "../table/table.css";
import { useFiterService } from "./utilsService";

const Service = () => {
  const { dataService, filterSearch } = useFiterService();
  return (
    <div className="table-container">
      <section className="table__header">
        <h1>My Services</h1>
        <div className="input-group">
          <input
            type="search"
            placeholder="Search Data..."
            onChange={filterSearch}
          />
        </div>
      </section>
      <section className="table__body">
        <table>
          <thead>
            <tr>
              <th>title</th>
              <th>description</th>
              <th>price</th>
              <th>paid</th>
              <th>status</th>
            </tr>
          </thead>
          <tbody>{dataService}</tbody>
        </table>
      </section>
    </div>
  );
};

export default Service;

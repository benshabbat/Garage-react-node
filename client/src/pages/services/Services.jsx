import "../../components/table/table.css";
import { useFiterService } from "./utilsService";
import { useServices } from "./utilsServices";
//TODO:MUST REFACTOR!!!!

//TODO:MAYBE USECONTEXT OF CONTACT WILL HELP OT USE WITH IT
const Services = () => {
  const { dataService, filterSearch } = useFiterService();
  const { user } = useServices();
  return (
    <div className="table-container">
      <section className="table__header">
        <h1>My Services of {`Car ${user?.cars[0]?.numberPlate}`}</h1>
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

export default Services;

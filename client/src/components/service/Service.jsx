import "../table/table.css";
import { useState } from "react";
import { useSelector } from "react-redux";

const Service = () => {
  const {services } = useSelector((state) => state.user);
  const [filterServices, setFilterServices] = useState();

  const filterSearch = (e) => {
    const { value } = e.target;
    setFilterServices(
      services.filter(
        (service) =>
          service?.title.includes(value) ||
          service?.description.includes(value) ||
          service?.price.toString().includes(value) ||
          service?.paid.toString().includes(value) ||
          service?.status.includes(value)
      )
    );
  };
  const bodyService = (service) => {
    console.log(service);
    return (
      <tr key={service?._id}>
        <td>{service?.title}</td>
        <td>{service?.description}</td>
        <td>{service?.price}</td>
        <td>{service?.paid && "paid"}</td>
        <td>
          <div className={`status ${service?.status}`}>{service?.status}</div>
        </td>
      </tr>
    );
  };

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
          <tbody>
            {filterServices? filterServices?.map(bodyService): services?.map(bodyService)}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Service;

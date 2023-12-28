import "../table/table.css";
import { useEffect } from "react";
import { useState } from "react";
const Service = ({ carServices }) => {
  const [filterServices, setFilterServices] = useState(carServices);

  const filterSearch = (e) => {
    const { value } = e.target;
    setFilterServices(
      carServices.filter(
        (item) =>
          item.car?.numberPlate.includes(value) ||
          item?.title.includes(value) ||
          item?.description.includes(value) ||
          item?.price.toString().includes(value) ||
          item?.paid.includes(value) ||
          item?.status.includes(value)
      )
    );
  };
  const bodyService = (service) => {
    return (
      <tr key={service?._id}>
        <td>{service?.car?.numberPlate}</td>
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
              <th>car</th>
              <th>title</th>
              <th>description</th>
              <th>price</th>
              <th>paid</th>
              <th>status</th>
            </tr>
          </thead>
          <tbody>{filterServices && filterServices?.map(bodyService)}</tbody>
        </table>
      </section>
    </div>
  );
};

export default Service;

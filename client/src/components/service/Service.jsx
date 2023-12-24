import "../table/table.css";
import React from "react";
const Service = ({ carServices }) => {
  return (
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
          {carServices?.map((service,index) => {
            return (
              <tr key={index}>
                <td>{service?.title}</td>
                <td>{service?.description}</td>
                <td>{service?.price}</td>
                <td>{service?.paid && "paid"}</td>
                <td>
                  <div className={`status ${service?.status}`}>
                    {service?.status}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <br />
    </section>
  );
};

export default Service;

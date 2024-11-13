import { useState } from "react";
import { useSelector } from "react-redux";

export function useFiterService(user){
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

    const dataService = filterServices? filterServices?.map(bodyService): services?.map(bodyService)

    return {dataService,filterSearch}
}



const bodyService = (service) => {
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

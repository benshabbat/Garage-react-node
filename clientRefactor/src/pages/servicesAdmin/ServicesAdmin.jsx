import { useServicesAdmin } from "../utilsServicesAdmin";
import Search from "./Search";
import ServiceAdminTable from "./ServiceAdminTable";
//TODO: TO CREATE CONTEXT FOR sERVICES OF ADMIN.
const ServicesAdmin = () => {
     return (
    <>
      <div className="table-container">
        <Search/>
        <ServiceAdminTable/>
      </div>
      <HandelAdminServices />
    </>
  );
}
};

export default ServicesAdmin;

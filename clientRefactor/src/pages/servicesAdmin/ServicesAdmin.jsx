import Search from "./Search";
import ServiceAdminModals from "./ServiceAdminModals";
import ServiceAdminProvider from "./ServiceAdminProvider";
import ServiceAdminTable from "./ServiceAdminTable";

const ServicesAdmin = () => {
  return (
    <ServiceAdminProvider>
      <div className="table-container">
        <Search />
        <ServiceAdminTable />
      </div>
      <ServiceAdminModals />
    </ServiceAdminProvider>
  );
};

export default ServicesAdmin;

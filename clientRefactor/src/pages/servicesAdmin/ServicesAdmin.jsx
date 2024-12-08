import ServiceAdminModals from "./ServiceAdminModals";
import ServiceAdminProvider from "./ServiceAdminProvider";
import ServiceAdminTable from "./ServiceAdminTable";
const ServicesAdmin = () => {
  return (
    <ServiceAdminProvider>
      <ServiceAdminTable />
      <ServiceAdminModals />
    </ServiceAdminProvider>
  );
};

export default ServicesAdmin;

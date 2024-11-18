import { useServicesAdmin } from "./utilsServicesAdmin";

const ServicesAdmin = () => {
  const { PageServiceAdmin } = useServicesAdmin();
  return PageServiceAdmin()
};

export default ServicesAdmin;

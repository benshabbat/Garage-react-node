import { useServicesAdmin } from "../utilsServicesAdmin";
//TODO: TO CREATE CONTEXT FOR sERVICES OF ADMIN.
const ServicesAdmin = () => {
  const { PageServiceAdmin } = useServicesAdmin();
  return PageServiceAdmin()
};

export default ServicesAdmin;

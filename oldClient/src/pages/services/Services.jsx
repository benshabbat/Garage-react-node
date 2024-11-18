import "./services.css";
import Service from "../../components/service/Service";
import { useServices } from "./utilsServices";
const Services = () => {
  const { user } = useServices();

  return (
    <>
      <h1 className="h-title">{`hello ${user?.username}`}</h1>
      <Service />
    </>
  );
};

export default Services;

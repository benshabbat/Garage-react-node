import "./services.css";
import Service from "../../components/service/Service";
import { useServices } from "./utilsServices";
const Services = () => {
  const { user } = useServices();
  const carService = (car) => {
    return (
      <div key={car?._id}>
        <h2 className="title">{car?.numberPlate}</h2>
        <Service />
      </div>
    );
  };
  return (
    <>
      <h1 className="h-title">{`hello ${user?.username}`}</h1>
      {user?.cars?.map(carService)}
    </>
  );
};

export default Services;

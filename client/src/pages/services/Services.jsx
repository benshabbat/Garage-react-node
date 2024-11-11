import "./services.css";
import {useEffect } from "react";
import { useParams } from "react-router-dom";
import Service from "../../components/service/Service";
import { useSelector,useDispatch} from "react-redux"
import { getServicesByIdCar } from "../../features/user/userSlice";
const Services = () => {
  const { user,services} = useSelector((state) => state.user);
  const { carId } = useParams();
  const carFilter = user?.cars?.filter((car) => car._id === carId);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getServicesByIdCar(carId));
  }, [user]);
  //need to work on services for user
  const carService = (car) => {
    return (
      <div key={car?._id}>
        <h2 className="title">{car?.numberPlate}</h2>
        <Service  key={car?._id} />
      </div>
    );
  };
  return (
    <>
      <h1 className="h-title">{`hello ${user?.username}`}</h1>
      {carId && carFilter
        ? carFilter?.map(carService)
        : user?.cars?.map(carService)}
    </>
  );
};

export default Services;

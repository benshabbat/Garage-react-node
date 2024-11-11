import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { getServicesByIdCar } from "../../features/user/userSlice";

export function useServices() {
  const { user } = useSelector((state) => state.user);
  const { carId } = useParams();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getServicesByIdCar(carId));
  }, [carId, dispatch]);

  return { user };
}

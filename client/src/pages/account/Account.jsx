import "./account.css";
import { useEffect } from "react";
import ReqService from "../../components/create/ReqService";
import AccountTables from "./AccountTables";
import { useAccountUIStore } from "../../stores/uiStores";
import { useUserStore } from "../../stores/userStore";

const Account = () => {
  const selectedCar = useAccountUIStore((s) => s.selectedCar);
  const getServicesByIdCar = useUserStore((s) => s.getServicesByIdCar);

  useEffect(() => {
    getServicesByIdCar(selectedCar?._id);
  }, [selectedCar, getServicesByIdCar]);

  return (
    <>
      <AccountTables />
      <ReqService />
    </>
  );
};

export default Account;

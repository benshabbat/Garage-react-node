import "./account.css";
import ReqService from "../../components/create/ReqService";
import AccountTables from "./AccountTables";
import { useAccountInit } from "./hooks/useAccountInit";

const Account = () => {
  useAccountInit();

  return (
    <>
      <AccountTables />
      <ReqService />
    </>
  );
};

export default Account;

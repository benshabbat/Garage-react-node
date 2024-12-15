import "./account.css";
import ReqService from "../../components/create/ReqService";
import AccountProvider from "./AccountProvider";
import AccountTables from "./AccountTables";

const Account = () => {
  return (
    <AccountProvider>
      <AccountTables />
      <ReqService />
    </AccountProvider>
  );
};

export default Account;

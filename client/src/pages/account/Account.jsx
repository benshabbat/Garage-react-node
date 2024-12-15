import "./account.css";
import ReqService from "../../components/create/ReqService";
import AccountProvider from "./AccountProvider";
import AccountTables from "./AccountTables";


  //TODO: ADD POP UP When req services, created  req of service with sign v
const Account = () => {
  return (
    <AccountProvider>
      <AccountTables />
      <ReqService />
    </AccountProvider>
  );
};

export default Account;

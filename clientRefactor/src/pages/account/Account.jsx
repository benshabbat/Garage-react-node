import "./account.css";
import ReqService from "../../components/create/ReqService";
import AccountProvider from "./AccountProvider";
import AccountTable from "./AccountTable";
const Account = () => {
  return (
    <AccountProvider>
      <AccountTable />
      <ReqService />
    </AccountProvider>
  );
};

export default Account;

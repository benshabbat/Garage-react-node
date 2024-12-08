import "./account.css";
import ReqService from "../../components/create/ReqService";
import { useAccount } from "./utilsAccount";
import AccountProvider from "./AccountProvider";
import AccountTable from "./AccountTable";
//TODO: TO CREATE CONTEXT FOR ACCOUNT
//TODO: TO USE WITH TABLE AND SEARCH GENERIC
const Account = () => {
  const {
    car,
    isOpenReqService,
    handleReqService,
    // Search,
  } = useAccount();

  return (
    <AccountProvider>
      <AccountTable />
      <ReqService
        car={car}
        handleClick={handleReqService}
        isOpen={isOpenReqService}
      />
    </AccountProvider>
  );
};

export default Account;

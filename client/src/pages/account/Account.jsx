import "./account.css";
import ReqService from "../../components/create/ReqService";
import { useAccount } from "./utilsAccount";

//TODO: TO MAKE CUSTOM COMPONENTS AND TO MOVE THEM TO UTILS ACCOUNT
const Account = () => {
  const {
    car,
    isOpenReqService,
    handleReqService,
    TableAccount,
    Search,
  } = useAccount();

  return (
    <>
      <div className="table-container">
        <Search />
        <TableAccount />
      </div>
      <ReqService
        car={car}
        handelClick={handleReqService}
        isOpen={isOpenReqService}
      />
    </>
  );
};

export default Account;

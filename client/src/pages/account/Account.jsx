import "./account.css";
import ReqService from "../../components/create/ReqService";
import { useAccount } from "./utilsAccount";

//TODO: TO MAKE CUSTOM COMPONENTS AND TO MOVE THEM TO UTILS ACCOUNT
const Account = () => {
  const { car, isOpenReqService, handleReqService, useFilterAccount } =
    useAccount();
  const { filterSearch,TableAccount} = useFilterAccount();



  return (
    <>
      <div className="table-container">
        <section className="table__header">
          <h1>My Cars</h1>
          <div className="input-group">
            <input
              type="search"
              placeholder="Search Data..."
              onChange={filterSearch}
            />
          </div>
        </section>
        <TableAccount />
      </div>
      {
        <ReqService
          car={car}
          handelClick={handleReqService}
          isOpen={isOpenReqService}
        />
      }
    </>
  );
};

export default Account;

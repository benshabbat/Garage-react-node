import "./account.css";
import ReqService from "../../components/create/ReqService";
import { useAccount } from "./utilsAccount";
//TODO: TO CREATE CONTEXT FOR ACCOUNT
const Account = () => {
  const {
    car,
    isOpenReqService,
    handleReqService,
    // Search,
    filterSearch,
    TableAccount,
  } = useAccount();

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
        {/* <Search /> */}
        <TableAccount />
      </div>
      <ReqService
        car={car}
        handleClick={handleReqService}
        isOpen={isOpenReqService}
      />
    </>
  );
};

export default Account;

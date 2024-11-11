import "./account.css";
import ReqService from "../../components/create/ReqService";
import { useAccount,  } from "./utilsAccount";
const Account = () => {
  const { car, isOpenReqService, handleReqService, user,useFilterAccount } =
    useAccount();
  const { filterSearch, bodyAccountForTable } = useFilterAccount();
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
        <section className="table__body">
          <table>
            <thead>
              <tr>
                <th>brand</th>
                <th>numberPlate</th>
                <th>km</th>
                <th>history service</th>
                <th>Request Service</th>
              </tr>
            </thead>
            <tbody>{bodyAccountForTable}</tbody>
          </table>
        </section>
      </div>
      {
        <ReqService
          car={car}
          handelClick={handleReqService}
          isOpen={isOpenReqService}
          user={user}
        />
      }
    </>
  );
};

export default Account;

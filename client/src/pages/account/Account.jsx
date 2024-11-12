import "./account.css";
import ReqService from "../../components/create/ReqService";
import { useAccount } from "./utilsAccount";

//TODO: TO MAKE CUSTOM COMPONENTS AND TO MOVE THEM TO UTILS ACCOUNT
const Account = () => {
  const { car, isOpenReqService, handleReqService, useFilterAccount } =
    useAccount();
  const { filterSearch, bodyAccountForTable } = useFilterAccount();
  const TableAccount = () => {
    return (
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
    );
  };
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

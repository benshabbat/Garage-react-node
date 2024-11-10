import "./account.css";
import ReqService from "../../components/create/ReqService";
import { useAccount, useFilterAccount } from "./utilsAccount";
const Account = () => {
  const {
    onServices,
    handelCar,
    car,
    isOpenReqService,
    handleReqService,
    user,
  } = useAccount();
  const { filterSearch, bodyAccountForTable } = useFilterAccount(
    user,
    onServices,
    handelCar
  );
  return (
    <>
      <div className="table-container">
        <section className="table__header">
          <h1>My Cars</h1>
          <div className="input-group">
            <input
              type="search"
              placeholder="Search Data..."
              onChange={(e) => filterSearch(e)}
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
            <tbody>{bodyAccountForTable()}</tbody>
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

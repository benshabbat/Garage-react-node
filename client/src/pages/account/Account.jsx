import "./account.css";
import ReqService from "../../components/create/ReqService";
import { useAccount, bodyAcc } from "./utilsAccount";
const Account = () => {
  const {
    filterSearch,
    onServices,
    handelCar,
    car,
    isOpenReqService,
    filterCars,
    handleReqService,
    user,
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
            <tbody>
              {filterCars
                ? filterCars?.map((car) => bodyAcc(car, onServices, handelCar))
                : user?.cars?.map((car) => bodyAcc(car, onServices, handelCar))}
            </tbody>
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

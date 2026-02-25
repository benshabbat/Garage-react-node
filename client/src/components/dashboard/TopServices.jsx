import { useDashboardContext } from "../../pages/dashboard/DashboardContext";

/**
 * TopServices displays the list of available services
 * Uses dashboard context to access data without props drilling
 */
const TopServices = () => {
  const { stats } = useDashboardContext();
  const { topServices } = stats;

  if (!topServices || topServices.length === 0) {
    return null;
  }

  return (
    <section className="section">
      <h2>Available Services</h2>
      <div className="services-list">
        {topServices.map((service) => (
          <div key={service._id} className="service-item">
            <div className="service-name">{service.name}</div>
            <div className="service-details">
              <span className="service-price">₪{service.price}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopServices;

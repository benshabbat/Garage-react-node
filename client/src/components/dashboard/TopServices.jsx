import { useDashboardStore } from "../../stores/dashboardStore";
import DashboardSection from "./DashboardSection";

const TopServices = () => {
  const topServices = useDashboardStore((s) => s.stats?.topServices);

  if (!topServices || topServices.length === 0) return null;

  return (
    <DashboardSection title="Available Services">
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
    </DashboardSection>
  );
};

export default TopServices;

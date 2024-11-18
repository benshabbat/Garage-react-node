import CardServiceLanding from "./CardServiceLanding";
import "./ServicesLanding.css";

const ServicesLanding = () => {
  const ServicesLandingList = [
    {
      icon: "🔧",
      title: "Car Maintenance",
      description: "Professional auto repair services",
    },
    {
      icon: "⚡",
      title: "Quick Service",
      description: "Efficient and reliable repairs",
    },
    {
      icon: "📋",
      title: "Vehicle Reports",
      description: "Detailed service history",
    },
    {
      icon: "📅",
      title: "Online Booking",
      description: "Easy appointment scheduling",
    },
  ];

  return (
    <section className="servicesLanding">
      <div className="container">
        <h2 className="section-title">Our Services</h2>
        <div className="servicesLanding-grid">
          {ServicesLandingList.map((service, index) => (
            <CardServiceLanding key={index} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesLanding;

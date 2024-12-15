// import CardServiceLanding from "./CardServiceLanding";
// import "./ServicesLanding.css";
import { useState } from "react";
const ServicesLanding = () => {
  const [hoveredService, setHoveredService] = useState(null);
  // const ServicesLandingList = [
  //   {
  //     icon: "🔧",
  //     title: "Car Maintenance",
  //     description: "Professional auto repair services",
  //   },
  //   {
  //     icon: "⚡",
  //     title: "Quick Service",
  //     description: "Efficient and reliable repairs",
  //   },
  //   {
  //     icon: "📋",
  //     title: "Vehicle Reports",
  //     description: "Detailed service history",
  //   },
  //   {
  //     icon: "📅",
  //     title: "Online Booking",
  //     description: "Easy appointment scheduling",
  //   },
  // ];
  const services = [
    {
      title: "Online Reports Access",
      description:
        "View your vehicle's service history, maintenance reports, and upcoming service schedules through our digital platform",
    },
    {
      title: "Service Requests",
      description:
        "Submit service requests online and track their status in real-time through our customer portal",
    },
    {
      title: "Direct Communication",
      description:
        "Message our garage manager directly to schedule appointments or discuss your vehicle's needs",
    },
    {
      title: "Vehicle Information",
      description:
        "Access detailed information about your vehicle, including maintenance history and technical specifications",
    },
    {
      title: "Online Booking",
      description:
        "Schedule your appointments online at your convenience through our digital booking system",
    },
    {
      title: "Digital Records",
      description:
        "All your vehicle's service records and documentation available digitally for easy access",
    },
  ];
  return (
    // <div id="services">
    //   <section className="servicesLanding">
    //     <div className="container">
    //       <h2 className="section-title">Our Services</h2>
    //       <div className="servicesLanding-grid">
    //         {ServicesLandingList.map((service, index) => (
    //           <CardServiceLanding key={index} service={service} />
    //         ))}
    //       </div>
    //     </div>
    //   </section>
    // </div>


    
    <div className="services-grid">
    {services.map((service, index) => (
      <div
        key={index}
        className={`service-card ${
          hoveredService === index ? "service-card-hovered" : ""
        }`}
        onMouseEnter={() => setHoveredService(index)}
        onMouseLeave={() => setHoveredService(null)}
      >
        <h3 className="service-title">{service.title}</h3>
        <p className="service-description">{service.description}</p>
      </div>
    ))}
  </div>
  );
};

export default ServicesLanding;

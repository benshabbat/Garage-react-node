import { useState } from "react";

const SERVICES = [
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

const ServicesLanding = () => {
  const [hoveredService, setHoveredService] = useState(null);

  return (
    <div className="services-grid">
      {SERVICES.map((service, index) => (
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

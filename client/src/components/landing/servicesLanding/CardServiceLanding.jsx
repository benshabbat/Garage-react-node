function CardServiceLanding({ service }) {
  return (
    <div className="servicesLanding-card">
      <div className="servicesLanding-icon">{service.icon}</div>
      <h3 className="servicesLanding-title">{service.title}</h3>
      <p>{service.description}</p>
    </div>
  );
}

export default CardServiceLanding;

import PropTypes from "prop-types";

/**
 * TopServices displays the list of available services
 */
const TopServices = ({ services }) => {
  if (!services || services.length === 0) {
    return null;
  }

  return (
    <section className="section">
      <h2>Available Services</h2>
      <div className="services-list">
        {services.map((service) => (
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

TopServices.propTypes = {
  services: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    })
  ),
};

export default TopServices;

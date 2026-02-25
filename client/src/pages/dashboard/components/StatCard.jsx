import PropTypes from "prop-types";

/**
 * StatCard displays a single statistics card with icon, title, number and optional subtitle
 */
const StatCard = ({ icon, title, number, subtitle }) => {
  return (
    <div className="stat-card">
      <div className="stat-icon">{icon}</div>
      <div className="stat-info">
        <h3>{title}</h3>
        <p className="stat-number">{number}</p>
        {subtitle && <small>{subtitle}</small>}
      </div>
    </div>
  );
};

StatCard.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  subtitle: PropTypes.string,
};

export default StatCard;

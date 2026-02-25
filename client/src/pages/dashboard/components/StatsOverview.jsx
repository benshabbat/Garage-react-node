import PropTypes from "prop-types";
import StatCard from "./StatCard";

/**
 * StatsOverview displays the overview statistics section with 6 stat cards
 */
const StatsOverview = ({ overview }) => {
  return (
    <section className="stats-overview">
      <StatCard
        icon="👥"
        title="Users"
        number={overview.totalUsers}
        subtitle={`Admins: ${overview.adminCount} | Regular: ${overview.regularUserCount}`}
      />
      <StatCard
        icon="🚗"
        title="Cars"
        number={overview.totalCars}
      />
      <StatCard
        icon="🔧"
        title="Services"
        number={overview.totalServices}
      />
      <StatCard
        icon="📅"
        title="Appointments"
        number={overview.totalAppointments}
      />
      <StatCard
        icon="💬"
        title="Messages"
        number={overview.totalMessages}
      />
      <StatCard
        icon="⭐"
        title="Reviews"
        number={overview.totalReviews}
        subtitle={`Average: ${overview.averageRating}`}
      />
    </section>
  );
};

StatsOverview.propTypes = {
  overview: PropTypes.shape({
    totalUsers: PropTypes.number.isRequired,
    adminCount: PropTypes.number.isRequired,
    regularUserCount: PropTypes.number.isRequired,
    totalCars: PropTypes.number.isRequired,
    totalServices: PropTypes.number.isRequired,
    totalAppointments: PropTypes.number.isRequired,
    totalMessages: PropTypes.number.isRequired,
    totalReviews: PropTypes.number.isRequired,
    averageRating: PropTypes.string.isRequired,
  }).isRequired,
};

export default StatsOverview;

import { useDashboardContext } from "../../pages/dashboard/DashboardContext";
import StatCard from "./StatCard";

/**
 * StatsOverview displays the overview statistics section with 6 stat cards
 * Uses dashboard context to access data without props drilling
 */
const StatsOverview = () => {
  const { stats } = useDashboardContext();
  const { overview } = stats;

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

export default StatsOverview;

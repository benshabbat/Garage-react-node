import { useDashboardContext } from "../../pages/dashboard/DashboardContext";
import StatCard from "./StatCard";

/**
 * StatsOverview displays the overview statistics section with 6 stat cards
 * Uses dashboard context to access data without props drilling
 */
const StatsOverview = () => {
  const { stats } = useDashboardContext();
  const { overview } = stats;

  const STAT_CARDS = [
    { icon: "👥", title: "Users",        number: overview.totalUsers,        subtitle: `Admins: ${overview.adminCount} | Regular: ${overview.regularUserCount}` },
    { icon: "🚗", title: "Cars",         number: overview.totalCars },
    { icon: "🔧", title: "Services",     number: overview.totalServices },
    { icon: "📅", title: "Appointments", number: overview.totalAppointments },
    { icon: "💬", title: "Messages",     number: overview.totalMessages },
    { icon: "⭐", title: "Reviews",      number: overview.totalReviews,      subtitle: `Average: ${overview.averageRating}` },
  ];

  return (
    <section className="stats-overview">
      {STAT_CARDS.map(({ icon, title, number, subtitle }) => (
        <StatCard key={title} icon={icon} title={title} number={number} subtitle={subtitle} />
      ))}
    </section>
  );
};

export default StatsOverview;

import { useDashboardData } from "./hooks/useDashboardData";
import {
  StatsOverview,
  AppointmentsByStatus,
  TopServices,
  RecentAppointments,
  RecentMessages,
  MonthlyTrends,
} from "../../components/dashboard";
import { exportToCsv } from "../../utils/exportCsv";
import "./Dashboard.css";

const Dashboard = () => {
  const { stats, isLoading, isError, message } = useDashboardData();

  if (isLoading) {
    return <div className="dashboard-loading">⏳ Loading dashboard…</div>;
  }

  if (isError) {
    return (
      <div className="dashboard-error">
        ⚠️ Failed to load dashboard: {message || "Unknown error"}
      </div>
    );
  }

  if (!stats?.overview) return null;

  const handleExport = () => {
    const o = stats.overview;
    exportToCsv(
      [
        { metric: "Total Users", value: o.totalUsers },
        { metric: "Total Cars", value: o.totalCars },
        { metric: "Total Services", value: o.totalServices },
        { metric: "Total Appointments", value: o.totalAppointments },
        { metric: "Total Messages", value: o.totalMessages },
        { metric: "Total Reviews", value: o.totalReviews },
        { metric: "Average Rating", value: o.averageRating },
      ],
      "dashboard-stats"
    );
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Dashboard</h1>
        <button
          className="refresh-button"
          onClick={handleExport}
          title="Export overview stats to CSV"
        >
          ⬇ Export CSV
        </button>
      </div>
      <StatsOverview />
      <AppointmentsByStatus />
      <TopServices />
      <RecentAppointments />
      <RecentMessages />
      <MonthlyTrends />
    </div>
  );
};

export default Dashboard;

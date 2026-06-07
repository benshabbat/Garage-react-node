import { useDashboardData } from "./hooks/useDashboardData";
import {
  StatsOverview,
  AppointmentsByStatus,
  TopServices,
  RecentAppointments,
  RecentMessages,
  MonthlyTrends,
} from "../../components/dashboard";
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

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Dashboard</h1>
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

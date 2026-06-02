import { useEffect } from "react";
import { useDashboardStore } from "../../stores/dashboardStore";
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
  const stats = useDashboardStore((s) => s.stats);
  const getDashboardStats = useDashboardStore((s) => s.getDashboardStats);

  useEffect(() => {
    getDashboardStats();
  }, [getDashboardStats]);

  return (
    stats?.overview && (
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
    )
  );
};

export default Dashboard;

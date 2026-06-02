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
  const { stats } = useDashboardData();

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

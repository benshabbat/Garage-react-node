import DashboardProvider from "./DashboardProvider";
import { useDashboardContext } from "./DashboardContext";
import {
  StatsOverview,
  AppointmentsByStatus,
  TopServices,
  RecentAppointments,
  RecentMessages,
  MonthlyTrends,
} from "../../components/dashboard";
import "./Dashboard.css";

/**
 * DashboardContent component that uses context to access data
 * Separated from Dashboard to consume context after provider wraps it
 */
const DashboardContent = () => {
  const { stats } = useDashboardContext();

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

/**
 * Dashboard page component
 * Wraps content with DashboardProvider following the application's provider pattern
 */
const Dashboard = () => {
  return (
    <DashboardProvider>
      <DashboardContent />
    </DashboardProvider>
  );
};

export default Dashboard;

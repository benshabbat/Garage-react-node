import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDashboardStats } from "../../features/dashboard/dashboardSlice";
import {
  StatsOverview,
  AppointmentsByStatus,
  TopServices,
  RecentAppointments,
  RecentMessages,
  MonthlyTrends,
} from "./components";
import "./Dashboard.css";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { stats, fetchState } = useSelector((state) => state.dashboard);
  const { isLoading, isError, message } = fetchState;

  useEffect(() => {
    dispatch(getDashboardStats());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="dashboard-container">
        <div className="loading">Loading data...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="dashboard-container">
        <div className="error">Error: {message}</div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="dashboard-container">
        <div className="loading">No data available - loading...</div>
      </div>
    );
  }

  if (!stats.overview) {
    return (
      <div className="dashboard-container">
        <div className="error">Error: Invalid data structure received</div>
        <div style={{ marginTop: "1rem", fontSize: "0.9rem", color: "#666" }}>
          Please check the server logs or contact support
        </div>
      </div>
    );
  }

  const { overview, appointments, messages, trends, topServices } = stats;

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dashboard</h1>

      <StatsOverview overview={overview} />
      <AppointmentsByStatus byStatus={appointments.byStatus} />
      <TopServices services={topServices} />
      <RecentAppointments appointments={appointments.recent} />
      <RecentMessages messages={messages.recent} />
      <MonthlyTrends trends={trends} />
    </div>
  );
};

export default Dashboard;

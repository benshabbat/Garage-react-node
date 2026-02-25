import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDashboardStats } from "../../features/dashboard/dashboardSlice";
import { DashboardContext } from "./DashboardContext";
import PropTypes from "prop-types";

/**
 * DashboardProvider manages the dashboard state and provides it to child components
 * Following the established provider pattern used across the application
 * Fetches data only when stats are not already available in Redux state
 */
export default function DashboardProvider({ children }) {
  const dispatch = useDispatch();
  const { stats, fetchState } = useSelector((state) => state.dashboard);
  const { isLoading, isError, message } = fetchState;

  useEffect(() => {
    dispatch(getDashboardStats());
  }, [dispatch]);

  // Manual refresh function for when data needs to be updated
  const refreshStats = () => {
    dispatch(getDashboardStats());
  };

  const value = {
    stats,
    isLoading,
    isError,
    message,
    refreshStats,
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
}

DashboardProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

import { useEffect } from "react";
import { DashboardContext } from "./DashboardContext";
import PropTypes from "prop-types";
import { useDashboardStore } from "../../stores/dashboardStore";

export default function DashboardProvider({ children }) {
  const stats = useDashboardStore((s) => s.stats);
  const isLoading = useDashboardStore((s) => s.isLoading);
  const isError = useDashboardStore((s) => s.isError);
  const message = useDashboardStore((s) => s.message);
  const getDashboardStats = useDashboardStore((s) => s.getDashboardStats);

  useEffect(() => {
    getDashboardStats();
  }, [getDashboardStats]);

  const refreshStats = () => {
    getDashboardStats();
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

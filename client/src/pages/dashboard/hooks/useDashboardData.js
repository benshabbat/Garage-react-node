import { useEffect } from "react";
import { useDashboardStore } from "../../../stores/dashboardStore";

export function useDashboardData() {
  const stats = useDashboardStore((s) => s.stats);
  const isLoading = useDashboardStore((s) => s.isLoading);
  const isError = useDashboardStore((s) => s.isError);
  const message = useDashboardStore((s) => s.message);
  const getDashboardStats = useDashboardStore((s) => s.getDashboardStats);

  useEffect(() => {
    getDashboardStats();
  }, [getDashboardStats]);

  return { stats, isLoading, isError, message };
}

import { useEffect } from "react";
import { useDashboardStore } from "../../../stores/dashboardStore";

export function useDashboardData() {
  const stats = useDashboardStore((s) => s.stats);
  const getDashboardStats = useDashboardStore((s) => s.getDashboardStats);

  useEffect(() => {
    getDashboardStats();
  }, [getDashboardStats]);

  return { stats };
}

import { create } from "zustand";
import { dashboardApi } from "../api/services/dashboardApi.js";
import { setErr } from "./storeUtils.js";

export const useDashboardStore = create((set) => ({
  stats: null,
  isLoading: false,
  isError: false,
  message: "",

  getDashboardStats: async () => {
    set({ isLoading: true });
    try {
      const data = await dashboardApi.getStats();
      set({ stats: data, isLoading: false });
    } catch (err) { setErr(set, err); }
  },

  resetDashboard: () => set({ stats: null, isLoading: false, isError: false, message: "" }),
}));

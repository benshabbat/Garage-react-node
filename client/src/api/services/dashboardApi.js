import axios from "../../axiosConfig.js";
import { API_URL_DASHBOARD } from "../apiEndpoints.js";

/**
 * Dashboard API operations
 */
export const dashboardApi = {
  /**
   * Get dashboard statistics
   * Requires admin authentication
   */
  getStats: async () => {
    const response = await axios.get(`${API_URL_DASHBOARD}/stats`);
    return response.data;
  },
};

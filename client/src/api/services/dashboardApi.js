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
    try {
      const response = await axios.get(`${API_URL_DASHBOARD}/stats`);
      return response.data;
    } catch (error) {
      console.error("dashboardApi.getStats - Error:", error.response?.data || error.message);
      throw error;
    }
  },
};

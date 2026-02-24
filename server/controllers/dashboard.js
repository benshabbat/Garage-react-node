import dashboardService from "../services/dashboardService.js";
import { createHandler } from "../utils/controllerFactory.js";

/**
 * Get dashboard statistics
 * @route GET /api/dashboard/stats
 * @access Admin only
 */
export const getDashboardStats = createHandler(
  dashboardService.getDashboardStats,
  200
);

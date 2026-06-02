/**
 * Legacy utils.js file - maintained for backwards compatibility
 * 
 * This file now imports from the new organized API structure.
 * New code should import directly from:
 * - import { userApi } from './api/services/userApi'
 * - import { carApi } from './api/services/carApi'
 * - etc.
 */

// Export all API functions
export * from "./api/index.js";

// Export date utilities
export { getMomentFromUpdatedAt, formatDate, getRelativeTime } from "./utils/dateUtils.js";

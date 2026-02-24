/**
 * Central export file for all API services
 * This file replaces the old utils.js and provides a cleaner structure
 */

// API endpoints
export * from "./apiEndpoints.js";

// Generic CRUD operations
export * from "./crudOperations.js";

// Service-specific APIs
export * from "./services/userApi.js";
export * from "./services/carApi.js";
export * from "./services/serviceApi.js";
export * from "./services/messageApi.js";
export * from "./services/reviewApi.js";
export * from "./services/contactApi.js";

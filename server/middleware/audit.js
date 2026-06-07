import AuditLog from "../models/AuditLog.js";

/**
 * Express middleware factory that writes an AuditLog entry after the response
 * completes successfully (2xx). Non-blocking — audit failure never breaks the
 * main operation.
 *
 * @param {string} action      - e.g. "DELETE_USER", "UPDATE_APPOINTMENT_STATUS"
 * @param {string} targetModel - e.g. "User", "Appointment"
 */
export const auditAdmin = (action, targetModel) => (req, res, next) => {
  res.on("finish", () => {
    if (res.statusCode >= 200 && res.statusCode < 300 && req.user?.id) {
      AuditLog.create({
        actor: req.user.id,
        action,
        targetModel,
        targetId: req.params.id || req.params.userId || undefined,
        details: { method: req.method, path: req.originalUrl },
      }).catch((err) => console.error("[audit] Failed to write log:", err.message));
    }
  });
  next();
};

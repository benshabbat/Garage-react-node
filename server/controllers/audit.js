import AuditLog from "../models/AuditLog.js";
import { getPaginationParams } from "../utils/queryHelpers.js";

export const getAuditLogs = async (req, res, next) => {
  try {
    const { limit, page } = getPaginationParams(req);
    const skip = (page - 1) * limit;

    const [logs, total] = await Promise.all([
      AuditLog.find()
        .sort({ timestamp: -1 })
        .skip(skip)
        .limit(limit)
        .populate("actor", "username email")
        .lean(),
      AuditLog.countDocuments(),
    ]);

    res.status(200).json({ logs, total, page, limit });
  } catch (error) {
    next(error);
  }
};

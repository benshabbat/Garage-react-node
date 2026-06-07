import mongoose from "mongoose";

const AuditLogSchema = new mongoose.Schema({
  actor: { type: mongoose.SchemaTypes.ObjectId, ref: "User", required: true },
  action: { type: String, required: true },
  targetModel: { type: String, required: true },
  targetId: { type: mongoose.SchemaTypes.ObjectId },
  details: { type: Object },
  timestamp: { type: Date, default: Date.now },
});

AuditLogSchema.index({ actor: 1 });
AuditLogSchema.index({ timestamp: -1 });

export default mongoose.model("AuditLog", AuditLogSchema);

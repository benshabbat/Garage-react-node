import mongoose from "mongoose";
const { Schema, SchemaTypes } = mongoose;

const ServiceSchema = new mongoose.Schema(
  {
    car: {
      type: SchemaTypes.ObjectId,
      ref: "Car",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    paid: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["pending", "in-progress", "done", "cancelled"],
      default: "pending",
      required: true,
    },
  },
  { timestamps: true }
);

ServiceSchema.index({ car: 1 });

export default mongoose.model("Service", ServiceSchema);

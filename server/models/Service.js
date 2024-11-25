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
    },
    paid: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      default: "pending",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Service", ServiceSchema);

import mongoose from "mongoose";
const { Schema, SchemaTypes } = mongoose;

const CarSchema = new mongoose.Schema(
  {
    owner: {
      type: SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    numberPlate: {
      type: "string",
      required: true,
      unique: true,
    },
    km: {
      type: "number",
      required: true,
    },
    brand: {
      type: "string",
      required: true,
    },
    services: {
      type: [
        {
          type: SchemaTypes.ObjectId,
          ref: "Service",
        },
      ],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Car", CarSchema);

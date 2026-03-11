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
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    km: {
      type: Number,
      required: true,
      min: [0, 'KM must be a non-negative number'],
    },
    brand: {
      type: String,
      required: true,
      trim: true,
      minlength: [2, 'Brand must be at least 2 characters'],
      maxlength: [50, 'Brand must be at most 50 characters'],
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

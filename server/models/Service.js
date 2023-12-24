import mongoose from "mongoose";
const { Schema, SchemaTypes } = mongoose;

const ServiceSchema = new mongoose.Schema(
  {
    // user: {
    //   type: SchemaTypes.ObjectId,
    //   ref: "User",
    //   required: true,
    // },
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
        required: true,
    },
    //Pending(red), On Work(yellow), Done(green)
    status: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Service", ServiceSchema);

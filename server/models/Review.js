import mongoose from "mongoose";
const { Schema,SchemaTypes } = mongoose;

const ReviewSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    stars: {
      type: Number,
      required: true,
      min: [1, 'Minimum rating is 1'],
      max: [5, 'Maximum rating is 5'],
      validate: {
        validator: Number.isInteger,
        message: 'Stars must be an integer',
      },
    },
  },
  { timestamps: true }
);
export default mongoose.model("Review", ReviewSchema);
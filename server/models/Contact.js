import mongoose from "mongoose";
const {model, Schema } = mongoose;

const ContactSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minlength: [2, 'First name must be at least 2 characters'],
      maxlength: [50, 'First name must be at most 50 characters'],
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      minlength: [2, 'Last name must be at least 2 characters'],
      maxlength: [50, 'Last name must be at most 50 characters'],
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please provide a valid email address'],
    },
    phone: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
      minlength: [10, 'Message must be at least 10 characters'],
      maxlength: [2000, 'Message must be at most 2000 characters'],
    }
  },
  { timestamps: true }
);

export default model("Contact", ContactSchema);
import mongoose from "mongoose";
const {model, Schema, SchemaTypes } = mongoose;

const MessageSchema = new Schema(
  {
    from: {
      type: SchemaTypes.ObjectId,
      ref: "User",
      required: false, // null for public (anonymous) messages
    },
    to: {
      type: SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: [2, 'Title must be at least 2 characters'],
      maxlength: [200, 'Title must be at most 200 characters'],
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: [2, 'Description must be at least 2 characters'],
      maxlength: [5000, 'Description must be at most 5000 characters'],
    },  
    read: {
      type: Boolean,
      default: false,
    }
  },
  { timestamps: true }
);

MessageSchema.index({ to: 1 });
MessageSchema.index({ from: 1 });

export default model("Message", MessageSchema);
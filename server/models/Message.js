import mongoose from "mongoose";
const {model, Schema, SchemaTypes } = mongoose;

const MessageSchema = new Schema(
  {
    from: {
      type: SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    to: {
      type: SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },  
    // read or not read  
    read: {
      type: Boolean,
      default:false,
      // required: true,
    }
  },
  { timestamps: true }
);

export default model("Message", MessageSchema);
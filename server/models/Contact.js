import mongoose from "mongoose";
const {model, Schema, SchemaTypes } = mongoose;

const MessageSchema = new Schema(
  {
    from: {
      type: String,
      required: true,
    },
    to: {
      type: SchemaTypes.ObjectId,
      ref: "User",
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
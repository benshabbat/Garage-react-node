import mongoose from "mongoose";
const {model, Schema } = mongoose;

const ContactSchema = new Schema(
  {
    from: {
      type: String,
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

export default model("Contact", ContactSchema);
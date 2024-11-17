import mongoose from "mongoose";
const {model, Schema } = mongoose;

const ContactSchema = new Schema(
  {
    from: {
      type: String,
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

export default model("Contact", ContactSchema);
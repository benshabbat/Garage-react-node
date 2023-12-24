import mongoose from "mongoose";
const { Schema,SchemaTypes } = mongoose;

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    cars: {
      type: [{type:SchemaTypes.ObjectId,ref:'Car'}]
    },
    messages: {
      type: [{type:SchemaTypes.ObjectId,ref:'Message'}]
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
export default mongoose.model("User", UserSchema);
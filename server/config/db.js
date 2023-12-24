import mongoose from "mongoose";

const connectDB = async () => {
    try {
      await mongoose.connect(process.env.MONGO);
      console.log("connected to mongoDB!");
    } catch (error) {
      throw error;
    }
  };
  mongoose.set('strictQuery', true);
  mongoose.connection.on("disconnected", () => {
    console.log("MongoDB disconnected!");
  });
  mongoose.connection.on("connected", () => {
    console.log("MongoDB connected!");
  });

  export default connectDB
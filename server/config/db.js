import mongoose from "mongoose";

const connectDB = async () => {
    if (!process.env.MONGO) {
      console.error("FATAL: MONGO connection string is not defined in environment variables");
      process.exit(1);
    }
    try {
      await mongoose.connect(process.env.MONGO);
      console.log("connected to mongoDB!");
    } catch (error) {
      console.error("MongoDB connection error:", error.message);
      process.exit(1);
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
import express from "express";
import dotenv from "dotenv";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import carsRoute from "./routes/cars.js";
import servicesRoute from "./routes/services.js";
import messagesRoute from "./routes/messages.js";
import reviewsRoute from "./routes/reviews.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./config/db.js"
// import errorHandler from "./middleware/errorHandler.js"
// import { logger } from "./middleware/logger.js";
// const { logger } = require('./middleware/logger')
const app = express();
dotenv.config();



//middlewares
// logger()
// app.use(logger())
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/api/auth", authRoute);
app.use("/users", usersRoute);
app.use("/cars", carsRoute);
app.use("/services", servicesRoute);
app.use("/messages", messagesRoute);
app.use("/reviews", reviewsRoute);


// app.use(errorHandler())
app.listen(8800, () => {
  connectDB();
  console.log("connected to backend!");
});

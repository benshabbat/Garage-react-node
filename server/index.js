import express from "express";
import dotenv from "dotenv";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import carsRoute from "./routes/cars.js";
import servicesRoute from "./routes/services.js";
import messagesRoute from "./routes/messages.js";
import reviewsRoute from "./routes/reviews.js";
// import contactsRoute from "./routes/contacts.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./config/db.js";
// import errorHandler from "./middleware/errorHandler.js"
// import { logger } from "./middleware/logger.js";
// const { logger } = require('./middleware/logger')
const app = express();
const port = process.env.PORT || 8800;
dotenv.config();

//middlewares
// logger()
// app.use(logger())
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cors());
app.use(cors({
  origin: 'http://localhost:5173', // הפורט שבו רץ שרת ה-Vite
  credentials: true
}));

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/cars", carsRoute);
app.use("/api/services", servicesRoute);
app.use("/api/messages", messagesRoute);
app.use("/api/reviews", reviewsRoute);
// app.use("/api/contacts", contactsRoute);

// app.use(errorHandler())
app.listen(port, () => {
  connectDB();
  console.log("connected to backend!");
});

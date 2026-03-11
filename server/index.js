import express from "express";
import dotenv from "dotenv";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import carsRoute from "./routes/cars.js";
import servicesRoute from "./routes/services.js";
import messagesRoute from "./routes/messages.js";
import reviewsRoute from "./routes/reviews.js";
import contactsRoute from "./routes/contacts.js";
import appointmentsRoute from "./routes/appointments.js";
import dashboardRoute from "./routes/dashboard.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import rateLimit from "express-rate-limit";
import connectDB from "./config/db.js";
import errorHandler from "./middleware/errorHandler.js"

// Load environment variables first
dotenv.config();

if (!process.env.JWT) {
  console.error("FATAL: JWT secret is not defined in environment variables");
  process.exit(1);
}

const app = express();
const port = process.env.PORT || 8800;

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20,
  message: { message: "Too many requests, please try again later" },
  standardHeaders: true,
  legacyHeaders: false,
});

const publicLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50,
  message: { message: "Too many requests, please try again later" },
  standardHeaders: true,
  legacyHeaders: false,
});

//middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
  origin: ['https://garage-client-one.vercel.app', 'http://localhost:5173'],
  credentials: true
}));

app.use("/api/auth", authLimiter, authRoute);
app.use("/api/users", usersRoute);
app.use("/api/cars", carsRoute);
app.use("/api/services", servicesRoute);
app.use("/api/messages", messagesRoute);
app.use("/api/reviews", publicLimiter, reviewsRoute);
app.use("/api/contacts", publicLimiter, contactsRoute);
app.use("/api/appointments", appointmentsRoute);
app.use("/api/dashboard", dashboardRoute);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use(errorHandler)
app.listen(port, () => {
  connectDB();
  console.log("connected to backend!");
});

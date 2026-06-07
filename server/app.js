import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import rateLimit from "express-rate-limit";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import carsRoute from "./routes/cars.js";
import servicesRoute from "./routes/services.js";
import messagesRoute from "./routes/messages.js";
import reviewsRoute from "./routes/reviews.js";
import contactsRoute from "./routes/contacts.js";
import appointmentsRoute from "./routes/appointments.js";
import dashboardRoute from "./routes/dashboard.js";
import agentRoute from "./routes/agent.js";
import auditRoute from "./routes/audit.js";
import errorHandler from "./middleware/errorHandler.js";
import { logger } from "./middleware/logger.js";

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { message: "Too many requests, please try again later" },
  standardHeaders: true,
  legacyHeaders: false,
});

const publicLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  message: { message: "Too many requests, please try again later" },
  standardHeaders: true,
  legacyHeaders: false,
});

const agentLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: { message: "Too many AI requests, please try again later" },
  standardHeaders: true,
  legacyHeaders: false,
});

const publicWriteLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { message: "Too many submissions, please try again later" },
  standardHeaders: true,
  legacyHeaders: false,
});

const app = express();

app.use(logger);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const allowedOrigins = process.env.CLIENT_URL
  ? [process.env.CLIENT_URL, "http://localhost:5173"]
  : ["https://garage-client-one.vercel.app", "http://localhost:5173"];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use("/api/auth", authLimiter, authRoute);
app.use("/api/users", publicLimiter, usersRoute);
app.use("/api/cars", publicLimiter, carsRoute);
app.use("/api/services", publicLimiter, servicesRoute);
app.use("/api/messages", publicLimiter, messagesRoute);
app.use("/api/reviews", publicLimiter, reviewsRoute);
app.post("/api/contacts", publicWriteLimiter);
app.use("/api/contacts", publicLimiter, contactsRoute);
app.post("/api/appointments", publicWriteLimiter);
app.use("/api/appointments", publicLimiter, appointmentsRoute);
app.use("/api/dashboard", publicLimiter, dashboardRoute);
app.use("/api/agent", agentLimiter, agentRoute);
app.use("/api/audit", publicLimiter, auditRoute);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use(errorHandler);

export default app;

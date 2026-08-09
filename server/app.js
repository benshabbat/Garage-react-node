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

const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;

/**
 * Throttles are disabled under NODE_ENV=test: otherwise a test's result depends
 * on how many requests the tests before it happened to make.
 */
const createLimiter = (windowMs, max, message) =>
  rateLimit({
    windowMs,
    max,
    message: { message },
    standardHeaders: true,
    legacyHeaders: false,
    skip: () => process.env.NODE_ENV === "test",
  });

const TOO_MANY = "Too many requests, please try again later";

const authLimiter = createLimiter(15 * MINUTE, 20, TOO_MANY);
const publicLimiter = createLimiter(15 * MINUTE, 50, TOO_MANY);
const agentLimiter = createLimiter(MINUTE, 10, "Too many AI requests, please try again later");
const publicWriteLimiter = createLimiter(
  15 * MINUTE,
  5,
  "Too many submissions, please try again later"
);
const signupLimiter = createLimiter(
  HOUR,
  5,
  "Too many registration attempts, please try again later"
);

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

app.post("/api/auth/signup", signupLimiter);
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

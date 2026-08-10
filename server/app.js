import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
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
import {
  agentLimiter,
  apiLimiter,
  authLimiter,
  loginLimiter,
  publicWriteLimiter,
  signupLimiter,
} from "./middleware/rateLimiters.js";

/**
 * How many reverse proxies sit in front of the app. Rate limiting keys on
 * req.ip, so behind a load balancer with this unset every caller looks like the
 * proxy and the whole user base shares one bucket.
 *
 * Set TRUST_PROXY to the number of hops (1 for a single load balancer). It is
 * deliberately off by default: trusting a forwarded header that nobody is
 * rewriting lets a client spoof its own address and slip the limiter entirely.
 */
export const parseTrustProxy = (value) => {
  if (value === undefined || value === "") return false;
  if (value === "false") return false;
  if (value === "true") return true;

  const hops = Number(value);
  if (Number.isInteger(hops) && hops >= 0) return hops;

  return value; // an IP or subnet list, which Express understands as-is
};

const app = express();

app.set("trust proxy", parseTrustProxy(process.env.TRUST_PROXY));

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

// The narrow limiters are registered ahead of the router they protect, so a
// login or a booking is counted by both its own budget and the general one.
app.post("/api/auth/signup", signupLimiter);
app.post("/api/auth/login", loginLimiter);
app.use("/api/auth", authLimiter, authRoute);
app.use("/api/users", apiLimiter, usersRoute);
app.use("/api/cars", apiLimiter, carsRoute);
app.use("/api/services", apiLimiter, servicesRoute);
app.use("/api/messages", apiLimiter, messagesRoute);
app.use("/api/reviews", apiLimiter, reviewsRoute);
app.post("/api/contacts", publicWriteLimiter);
app.use("/api/contacts", apiLimiter, contactsRoute);
app.post("/api/appointments", publicWriteLimiter);
app.use("/api/appointments", apiLimiter, appointmentsRoute);
app.use("/api/dashboard", apiLimiter, dashboardRoute);
app.use("/api/agent", agentLimiter, agentRoute);
app.use("/api/audit", apiLimiter, auditRoute);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use(errorHandler);

export default app;

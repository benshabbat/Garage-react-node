import dotenv from "dotenv";
import connectDB from "./config/db.js";
import app from "./app.js";

// Load environment variables first
dotenv.config();

if (!process.env.JWT) {
  console.error("FATAL: JWT secret is not defined in environment variables");
  process.exit(1);
}

if (!process.env.ANTHROPIC_API_KEY) {
  console.warn("WARNING: ANTHROPIC_API_KEY is not set — /api/agent endpoints will be unavailable");
}

const port = process.env.PORT || 8800;

process.on("unhandledRejection", (reason) => {
  console.error("Unhandled promise rejection:", reason);
  process.exit(1);
});

async function start() {
  await connectDB();
  const server = app.listen(port, () => {
    console.log("connected to backend!");
  });

  const shutdown = () => {
    server.close(() => {
      process.exit(0);
    });
  };
  process.on("SIGTERM", shutdown);
  process.on("SIGINT", shutdown);
}
start();

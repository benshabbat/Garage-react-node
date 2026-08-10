import rateLimit from "express-rate-limit";

const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;

/**
 * Throttles are disabled under NODE_ENV=test: otherwise a test's result depends
 * on how many requests the tests before it happened to make.
 *
 * Every limiter keys on req.ip, which is only the real caller once Express is
 * told how many proxies sit in front of it — see the TRUST_PROXY handling in
 * app.js. Without it a deployment behind a load balancer buckets its entire
 * user base together.
 */
export const createLimiter = (windowMs, max, message) =>
  rateLimit({
    windowMs,
    max,
    message: { message },
    standardHeaders: true,
    legacyHeaders: false,
    skip: () => process.env.NODE_ENV === "test",
  });

const TOO_MANY = "Too many requests, please try again later";

/**
 * Reads for a signed-in session. Sized for real use rather than for an attacker:
 * an admin opening the dashboard, a table and a couple of edit dialogs spends
 * ~25 requests in a few minutes, and each modal open *and* close refetches.
 * Credential stuffing and spam are handled by the narrow limiters below, which
 * guard the endpoints that actually reward abuse.
 */
export const apiLimiter = createLimiter(15 * MINUTE, 300, TOO_MANY);

/** Password guessing is the thing worth throttling hard. */
export const loginLimiter = createLimiter(
  15 * MINUTE,
  10,
  "Too many login attempts, please try again later"
);

/** Refresh, logout and admin-id — hit routinely by a healthy session. */
export const authLimiter = createLimiter(15 * MINUTE, 60, TOO_MANY);

export const signupLimiter = createLimiter(
  HOUR,
  5,
  "Too many registration attempts, please try again later"
);

/** Unauthenticated writes: bookings and contact forms. */
export const publicWriteLimiter = createLimiter(
  15 * MINUTE,
  5,
  "Too many submissions, please try again later"
);

/** Every AI call costs money, so this one stays tight. */
export const agentLimiter = createLimiter(
  MINUTE,
  10,
  "Too many AI requests, please try again later"
);

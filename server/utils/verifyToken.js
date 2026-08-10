import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";

/**
 * Requires a valid access token cookie and attaches the decoded payload to req.user.
 *
 * A missing, malformed or expired token is a 401 (not a 403): the client's axios
 * interceptor refreshes on 401, so a 403 here would break silent token refresh
 * and log users out every 15 minutes when the access token expires.
 */
export const verifyToken = (req, res, next) => {
  const token = req.cookies?.access_token;

  if (!token) {
    return next(createError(401, "Not authenticated"));
  }

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) {
      return next(createError(401, "Token is not valid"));
    }

    req.user = user;
    next();
  });
};

/**
 * Attaches req.user when a valid access token is present, but never rejects.
 * For endpoints that are public yet behave differently for signed-in callers
 * (e.g. linking a booking to the account that made it).
 */
export const optionalAuth = (req, res, next) => {
  const token = req.cookies?.access_token;

  if (!token) return next();

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (!err) req.user = user;
    next();
  });
};

/**
 * Allows the owner of a user account or an admin.
 *
 * Only valid on routes whose `:id` / `:user` param is a USER id. Routes keyed by
 * a resource id (a car, a service, an appointment) must use verifyToken and check
 * ownership in the service layer, where the owner can actually be looked up.
 */
export const verifyUser = (req, res, next) => {
  verifyToken(req, res, (err) => {
    if (err) return next(err);

    const routeUserId = req.params.id ?? req.params.user;
    if (req.user.id === routeUserId || req.user.isAdmin) {
      return next();
    }

    return next(createError(403, "You are not authorized to access this resource"));
  });
};

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, (err) => {
    if (err) return next(err);

    if (req.user.isAdmin) {
      return next();
    }

    return next(createError(403, "You are not authorized as admin"));
  });
};

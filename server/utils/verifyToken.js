import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";

const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    
    if (!token) {
      return next(createError(401, "Not authenticated"));
    }

    jwt.verify(token, process.env.JWT, (err, user) => {
      if (err) {
        return next(createError(403, "Token is not valid"));
      }
      
      req.user = user;
      next();
    });
  } catch (err) {
    next(createError(500, "Error verifying token"));
  }
};

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, (err) => {
    if (err) return next(err);
    
    if (req.user.id === req.params.id || req.user.isAdmin) {
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
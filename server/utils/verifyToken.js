// import jwt from "jsonwebtoken";
// import { createError } from "../utils/error.js";

// export const verifyToken = (req, res, next) => {
//   const token = req.cookies.access_token;
//   if (!token) return next(createError(401, "Your are not authenticated!"));
//   jwt.verify(token, process.env.JWT, (err, user) => {
//     if (err) {
//       return next(createError(403, "Token is not valid!"));
//     } else {
//       req.user = user;
//       next();
//     }
//   });
// };

// export const verifyUser = (req, res, next) => {
//   verifyToken(req, res, () => {
//     if (req.user.id === req.params.id || req.user.isAdmin||req.user.id) {
//       return next();
//     } else {
//       return next(createError(403, "You are not auth"));
//     }
//   });
// };


// export const verifyAdmin = (req, res, next) => {
//   verifyToken(req, res, () => {
//     if (req.user.isAdmin) {
//       return next();
//     } else {
//       return next(createError(403, "You are not auth"));
//     }
//   });
// };


import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(createError(401, "You are not authenticated!"));
  }

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) {
      return next(createError(403, "Token is not valid!"));
    }
    req.user = user;
    next();
  });
};

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, (err) => {
    if (err) {
      return next(err);
    }
    
    if (!req.user) {
      return next(createError(403, "User not authenticated"));
    }

    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      next(createError(403, "You are not authorized"));
    }
  });
};

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, (err) => {
    if (err) {
      return next(err);
    }
    
    if (!req.user) {
      return next(createError(403, "User not authenticated"));
    }

    if (req.user.isAdmin) {
      next();
    } else {
      next(createError(403, "You are not authorized as admin"));
    }
  });
};
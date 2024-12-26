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
  console.log("Cookies:", req.cookies);
  const token = req.cookies.access_token;
  if (!token) {
    console.log("No token found");
    return next(createError(401, "Not authenticated"));
  }
  
  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) console.log("Token verification failed:", err);
    req.user = user;
    next();
  });
};

// export const verifyUser = (req, res, next) => {
//   verifyToken(req, res, (err) => {
//     if (err) {
//       return next(err);
//     }
    
//     if (!req.user) {
//       return next(createError(403, "User not authenticated"));
//     }

//     if (req.user.id === req.params.id || req.user.isAdmin) {
//       next();
//     } else {
//       next(createError(403, "You are not authorized"));
//     }
//   });
// };

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, (err) => {
    if (err) {
      console.log('Token verification failed:', err);
      return next(err);
    }

    console.log('User in request:', req.user);
    console.log('Params ID:', req.params.id);

    if (!req.user || !req.user.id) {
      return next(createError(403, "Authentication failed - no user data"));
    }

    if (req.user.id === req.params.id || req.user.isAdmin) {
      return next();
    }
    
    return next(createError(403, "You are not authorized to access this resource"));
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

    if (req?.user?.isAdmin) {
      next();
    } else {
      next(createError(403, "You are not authorized as admin"));
    }
  });
};
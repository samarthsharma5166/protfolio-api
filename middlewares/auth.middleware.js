const AppError = require("../utils/error.utils");
const jwt = require('jsonwebtoken');

const isLoggedIn = async (req, res, next) => {
  try {
    const token = req.cookies ? req.cookies.token : null; // Check if req.cookies exists
    if (!token) {
      return next(new AppError("Unauthenticated, please try again!", 401)); // Instantiate AppError with new keyword
    }
    const userDetail = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = userDetail;
    next();
  } catch (error) {
    return next(new AppError(error.message, 500)); // Return error message from jwt.verify
  }
};

module.exports = isLoggedIn;

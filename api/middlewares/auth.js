const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const { rolesRights } = require("../config/roles");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const verifyCallback = (req, requiredRights, next) => {
  if (!req.user) {
    return new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate");
  }
  let user = req.user;

  if (requiredRights.length) {
    const userRights = rolesRights[user.role];
    const hasRequiredRights = requiredRights.every((requiredRight) =>
      userRights.includes(requiredRight)
    );
    if (!hasRequiredRights && req.params.userId !== user._id) {
      //this will make sure any user with like: no manageUsers right can manage own credentials
      //speciallly the second part of the logic after &&
      //for this to work must include userId in any request url path
      return new ApiError(httpStatus.FORBIDDEN, "Forbidden");
    }
  }

  next();
};

const auth = (...requiredRights) => async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return res.status(401).json({
      status: "fail",
      message: "Unauthorized",
      code: 401,
    });
  }
  let decoded;
  try {
    decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  } catch (err) {
    next(err);
  }
  let currentUser = await User.findById(decoded.sub);
  req.user = currentUser;
  verifyCallback(req, requiredRights, next);
};

module.exports = auth;

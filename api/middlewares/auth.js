const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const { rolesRights } = require("../config/roles");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const { Token } = require("../models");

const verifyCallback = (req, requiredRights) => {
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
      console.log("received");

      return new ApiError(httpStatus.FORBIDDEN, "Forbidden");
    }
  }
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
    if (!decoded) throw new ApiError(httpStatus.UNAUTHORIZED, "Invalid Token");
    let currentUser = await User.findById(decoded.sub);
    req.user = currentUser;
    let tokenDoc = await Token.find({
      user:
        currentUser._id /** optional: can implement jwt hash check by storing jwtHash along with Token  in database, it can not block replay of logged out token now */,
    });
    if (!tokenDoc) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "Token Not Registerd");
    }
    verifyCallback(req, requiredRights);
  } catch (err) {
    next(err);
  }

  next();
};

module.exports = auth;

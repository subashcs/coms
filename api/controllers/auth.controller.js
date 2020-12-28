const httpStatus = require("http-status");
const {
  authService,
  userService,
  tokenService,
  emailService,
} = require("../services");
const ApiError = require("../utils/ApiError");
const catchError = require("../utils/catchError");

const register = catchError(async (req, res) => {
  const user = await userService.createUser(req.body);
  const tokens = await tokenService.generateAuthTokens(user);
  res.status(httpStatus.CREATED).send({ user, tokens });
});

const login = catchError(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);

  const tokens = await tokenService.generateAuthTokens(user);
  let userData = {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  res.send({ user: userData, tokens });
});

const logout = catchError(async (req, res) => {
  await authService.logout(req.body.refreshToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const refreshTokens = catchError(async (req, res) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken);
  res.send({ ...tokens });
});

const forgotPassword = catchError(async (req, res) => {
  const resetPasswordToken = await tokenService.generateResetPasswordToken(
    req.body.email
  );
  await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const resetPassword = catchError(async (req, res) => {
  await authService.resetPassword(req.query.token, req.body.password);
  res.status(httpStatus.NO_CONTENT).send();
});
const getUserProfile = catchError(async (req, res) => {
  let email = req.query.email;
  if (!email) {
    throw new ApiError(httpStatus.BAD_REQUEST, "email is required param");
  }
  const user = await userService.getUserByEmail(email);

  return res.status(httpStatus.OK).send(user);
});

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  getUserProfile,
};

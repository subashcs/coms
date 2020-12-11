const httpStatus = require("http-status");
const pick = require("../utils/pick");
const ApiError = require("../utils/ApiError");
const { userService } = require("../services");
const catchError = require("../utils/catchError");

const createUser = catchError(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const getUsers = catchError(async (req, res) => {
  const filter = pick(req.query, ["name", "role"]);
  // limit : or pageSize same
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  options.limit = options.limit ? options.limit : 5;
  options.page = options.page ? options.page : 1;

  const result = await userService.queryUsers(filter, options);
  res.send(result);
});

const getUser = catchError(async (req, res) => {
  const user = await userService.getUserById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  res.send(user);
});

const updateUser = catchError(async (req, res) => {
  const user = await userService.updateUserById(req.params.userId, req.body);
  res.send(user);
});

const deleteUser = catchError(async (req, res) => {
  await userService.deleteUserById(req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};

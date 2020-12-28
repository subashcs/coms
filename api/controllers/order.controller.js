const httpStatus = require("http-status");
const pick = require("../utils/pick");
const ApiError = require("../utils/ApiError");
const { orderService } = require("../services");
const catchError = require("../utils/catchError");

const createOrder = catchError(async (req, res) => {
  let data = req.body;
  try {
    if (!req.user) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "User not set");
    }
  } catch (err) {
    next(err);
  }
  data.customer = req.user._id;
  const order = await orderService.createOrder(data);
  res.status(httpStatus.CREATED).send(order);
});

const getOrders = catchError(async (req, res) => {
  const filter = pick(req.query, ["name", "role"]);
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  options.limit = options.limit ? options.limit : 5;
  options.page = options.page ? options.page : 1;
  const result = await orderService.queryOrders(filter, options);
  res.send(result);
});

const getOrdersByCustomer = catchError(async (req, res) => {
  const filter = pick(req.query, ["name", "role"]);
  const options = pick(req.query, ["sortBy", "limit", "page"]);

  options.limit = options.limit ? options.limit : 5;
  options.page = options.page ? options.page : 1;
  filter.customer = req.params.userId;
  const result = await orderService.queryOrders(filter, options);
  res.send(result);
});

const getOrder = catchError(async (req, res) => {
  const order = await orderService.getOrderById(req.params.orderId);
  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, "Order not found");
  }
  res.send(order);
});

const updateOrder = catchError(async (req, res) => {
  const order = await orderService.updateOrderById(
    req.params.orderId,
    req.body
  );
  res.send(order);
});

const deleteOrder = catchError(async (req, res) => {
  await orderService.deleteOrderById(req.params.orderId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createOrder,
  getOrders,
  getOrdersByCustomer,
  getOrder,
  updateOrder,
  deleteOrder,
};

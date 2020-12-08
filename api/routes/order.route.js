const express = require("express");
const auth = require("../middlewares/auth");
const orderController = require("../controllers/order.controller");

const router = express.Router();

router
  .route("/")
  .post(auth("manageOrders"), orderController.createOrder)
  .get(auth("getOrders"), orderController.getOrders);
router
  .route("/:userId/:orderId")
  .get(auth("getOrdersByCustomer"), orderController.getOrdersByCustomer);
router
  .route("/:orderId")
  .get(auth("getOrders"), orderController.getOrder)
  .patch(auth("manageOrders"), orderController.updateOrder)
  .delete(auth("manageOrders"), orderController.deleteOrder);

module.exports = router;

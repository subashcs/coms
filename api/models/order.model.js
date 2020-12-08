const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const orderSchema = mongoose.Schema(
  {
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    shippingAddress: {
      type: String,
    },
    markedPrice: {
      type: String,
      required: true,
    },
    discountPercentage: {
      type: String,
      required: true,
    },
    sellingPrice: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * @typedef Order
 */
const Order = mongoose.model("Order", orderSchema);

module.exports = Order;

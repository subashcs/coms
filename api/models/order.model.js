const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const orderSchema = mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: Number,
      },
    ],
    shippingAddress: {
      type: String,
    },
    paymentMethod: {
      type: String,
    },
    markedPrice: {
      type: Number,
      required: true,
    },
    discountPercentage: {
      type: Number,
      required: true,
    },
    sellingPrice: {
      type: Number,
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

const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const slugify = require("slugify");

const orderSchema = mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    slug: { type: String },
    products: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: Number,
      },
    ],
    shippingAddress: {
      type: String,
    },
    shippingStatus: {
      type: String,
      enum: ["shipped", "not-shipped"],
      default: "not-shipped",
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
// orderSchema.pre("save", () => {
//   this.slug = slugify(this.name);
// });

module.exports = Order;

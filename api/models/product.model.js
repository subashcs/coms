const mongoose = require("mongoose");
const validator = require("validator");
const { roles } = require("../config/roles");

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    imageUrl: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
      validator(value) {
        if (value < 0) {
          throw new Error("Price cannot be negative number");
        }
      },
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * @typedef Product
 */
const Product = mongoose.model("Product", productSchema);

module.exports = Product;

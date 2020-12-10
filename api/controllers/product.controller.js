const httpStatus = require("http-status");
const pick = require("../utils/pick");
const ApiError = require("../utils/ApiError");
const { productService } = require("../services");
const catchError = require("../utils/catchError");

const createProduct = catchError(async (req, res) => {
  const product = await productService.createProduct(req.body);
  return res.status(httpStatus.CREATED).send(product);
});

const getProducts = catchError(async (req, res) => {
  const filter = pick(req.query, ["name", "role"]);
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  const result = await productService.queryProducts(filter, options);
  return res.send(result);
});

const getProduct = catchError(async (req, res) => {
  const product = await productService.getProductById(req.params.productId);
  if (!product) {
    throw new ApiError(httpStatus.NOT_FOUND, "Product not found");
  }
  return res.send(product);
});

const updateProduct = catchError(async (req, res) => {
  const product = await productService.updateProductById(
    req.params.productId,
    req.body
  );
  return res.send(product);
});

const deleteProduct = catchError(async (req, res) => {
  await productService.deleteProductById(req.params.productId);
  return res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};

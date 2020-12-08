const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const app = express();
const routes = require("./routes");
const { errorConverter, errorHandler } = require("./middlewares/error");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger("combined"));

app.use("/v1", routes);
app.use(errorConverter);
app.use(errorHandler);
module.exports = app;

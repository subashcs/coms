const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();
const cors = require("cors");

const routes = require("./routes");
const { errorConverter, errorHandler } = require("./middlewares/error");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("combined"));

app.use("/v1", routes);

app.use(errorConverter);
app.use(errorHandler);

module.exports = app;

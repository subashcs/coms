require("dotenv").config();
const app = require("./app");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 5200;
const DB_URL = process.env.DB_URL;
mongoose.Promise = global.Promise;
mongoose
  .connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Database Connected...\n", DB_URL);
    app.listen(PORT, () => {
      console.log("API started on Port", PORT, "\n ");
    });
  })
  .catch((err) => {
    console.log("Error Connecting to Database", err);
  });

mongoose.connection.on("error", (err) => {
  console.log(err.toString());
});

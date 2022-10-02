const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config(); // loads .env file contents into "process.env" variable

require("./startup/routes")(app);

// Connecting with Database
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB connection successful..!!"))
  .catch((error) => console.log("Could not connect to database: ", error));

// Running backend server on the given port
let port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Backend server listening on port ${port}`);
});

const express = require("express");
const cors = require("cors");
const authRoute = require("../routes/auth");
const userRoute = require("../routes/user");
const categoryRoute = require("../routes/category");
const productsRoute = require("../routes/product");

module.exports = function (app) {
  app.use(express.json());
  app.use(cors());

  // Routes that handles the http requests:  any http request that matches these resources will be redirected to that particular route module
  app.use("/api/auth", authRoute);
  app.use("/api/users", userRoute);
  app.use("/api/categories", categoryRoute);
  app.use("/api/products", productsRoute);
};

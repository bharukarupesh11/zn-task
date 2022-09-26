const express = require("express");
const cors = require("cors");
const login = require("../routes/login");
const users = require("../routes/user");
const productCategory = require("../routes/product_category");
const product = require("../routes/product");

module.exports = function (app) {
  app.use(express.json());
  app.use(cors());

  // Routes that handles the http requests:  any http request that matches these resources will be redirected to that particular route module
  app.use("/api/login", login);
  app.use("/api/users", users);
  app.use("/api/product/category", productCategory);
  app.use("/api/product", product);
};

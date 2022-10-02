const mongoose = require("mongoose");

// Creating a category schema
const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
  },
  { timestamps: true }
);

// Creating a category model
module.exports = mongoose.model("Category", categorySchema); // modelname, schema

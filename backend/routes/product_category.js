const express = require("express"); // returns a function
const router = express.Router(); //returns a router object
const auth = require("../middleware/auth"); // here auth represents authorization but not the authentication

const db = require("../models"); // // When require is given the path of a folder, it'll look for an index.js file in that folder, if there is one, it uses that, otherwise it fails.
const User = db.user;
const ProductCategory = db.product_category;

// API to get list of all categories
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.userId);
    if (!user || !user.isAdmin)
      return res.status(403).send({ errorMsg: "Access denied." });

    const categories = await ProductCategory.findAndCountAll(); // returns count of total records along with the resultset

    console.log("All Categories: ", categories);

    return res.status(200).send(categories);
  } catch (err) {
    console.log("Error Occurred in get all product categories api: ", err);
    return res.send({ errorMsg: err.errors[0].message });
  }
});

// API to add new product category
router.post("/", auth, async (req, res) => {
  try {
    // only admin user is allowed to add new product category
    let user = await User.findByPk(req.user.userId);
    if (!user || !user.isAdmin) return res.status(403).send("Access denied.");

    category = await ProductCategory.create({
      name: req.body.name,
    });

    return res.status(200).send(category.dataValues);
  } catch (err) {
    console.log(`Error occurred in create product category api: ${err} `);

    // res.send(err);  // sending the entire error object
    return res.send({ errorMsg: err.errors[0].message });
  }
});

module.exports = router; //exporting a router

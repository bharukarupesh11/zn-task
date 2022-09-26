const express = require("express"); // returns a function
const router = express.Router(); //returns a router object
const auth = require("../middleware/auth"); // here auth represents authorization but not the authentication
const multer = require("multer");

const db = require("../models"); // // When require is given the path of a folder, it'll look for an index.js file in that folder, if there is one, it uses that, otherwise it fails.
const User = db.user;
const ProductCategory = db.product_category;
const Product = db.product;

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "products");
  },
  filename: function (req, file, callback) {
    // callback(null, ` ${Date.now()}_ ${file.originalname}`)
    callback(null, ` ${file.originalname}`);
  },
});

const productImg = multer({ storage: storage });

// API to get list of all products with their categories
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.userId);
    if (!user || !user.isAdmin)
      return res.status(403).send({ errorMsg: "Access denied." });

    const result = await Product.findAll({ include: ["product_category"] });

    console.log("Result : ", result);

    return res.status(200).send(result);
  } catch (err) {
    console.log("Error Occurred in get all product categories api: ", err);
    return res.send({ errorMsg: err.errors[0].message });
  }
});

// API to get product details for the given product id
router.get("/:productId", auth, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.userId);
    if (!user || !user.isAdmin)
      return res.status(403).send({ errorMsg: "Access denied." });

    const result = await Product.findByPk(req.params.productId);
    // const result = await Product.findByPk(req.params.productId, {
    //   include: ["product_category"],
    // });

    console.log("Result : ", result);

    return res.status(200).send(result);
  } catch (err) {
    console.log("Error Occurred in get all product categories api: ", err);
    return res.send({ errorMsg: err.errors[0].message });
  }
});

/** Note: single("imageUrl") requires name of your field which contains your actual file. */
router.post(
  "/",
  auth,
  productImg.single("imageUrl"),
  async (req, res, next) => {
    try {
      console.log("Req Body Obj: ", req.body);

      // only admin user is allowed to add new product category
      let user = await User.findByPk(req.user.userId);
      if (!user || !user.isAdmin) return res.status(403).send("Access denied.");

      const productImg = req.file;

      if (!productImg)
        return res
          .status(400)
          .send({ errorMsg: "Missing a product image...!" });

      let productObj = {
        name: req.body.name,
        description: req.body.description,
        imageUrl: productImg.originalname,
        categoryId: req.body.categoryId,
      };

      product = await Product.create(productObj); // add new product

      return res.status(200).send(product);
    } catch (err) {
      console.log("Error occurred in create product api: ", err);
      return res.send({ errorMsg: err.errors[0].message });
    }
  }
);

module.exports = router; //exporting a router

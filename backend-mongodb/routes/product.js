const router = require("express").Router();
const multer = require("multer");
const Product = require("../models/Product");
const { verifyTokenAndAdmin } = require("../middleware/verifyToken");

// Store product image
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

// CREATE PRODUCT
router.post(
  "/",
  verifyTokenAndAdmin,
  productImg.single("image"),
  async (req, res) => {
    try {
      const productImg = req.file;

      if (!productImg)
        return res
          .status(400)
          .send({ errorMsg: "Missing a product image...!" });

      //  Add image file name in the image property of a model class
      req.body.image = productImg.originalname;
      console.log("Req Body: ", req.body);
      const product = new Product(req.body);

      const savedProduct = await product.save();
      return res.send(savedProduct);
    } catch (error) {
      console.log("Error: ", error);
      return res.send(error);
    }
  }
);

// DELETE PRODUCT
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.send("Product deleted successfully");
  } catch (error) {
    console.log("Error: ", error);
    return res.send(error);
  }
});

// GET PRODUCT: Everybody can see the products. So this will be a public API(No authentication and no authorization).
router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.send(product);
  } catch (error) {
    console.log("Error: ", error);
    return res.send(error);
  }
});

// GET ALL PRODUCTS: Everybody can see the list of all products. So this will be a public API(No authentication and no authorization).
router.get("/", async (req, res) => {
  try {
    let products = await Product.find().populate("category");

    res.send(products);
  } catch (error) {
    console.log("Error: ", error);
    return res.send(error);
  }
});

module.exports = router;

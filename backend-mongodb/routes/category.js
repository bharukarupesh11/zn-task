const router = require("express").Router();
const Category = require("../models/Category");
const { verifyTokenAndAdmin } = require("../middleware/verifyToken");

// CREATE CATEGORY
router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const category = new Category(req.body);

  try {
    const savedCategory = await category.save();
    return res.send(savedCategory);
  } catch (error) {
    console.log("Error: ", error);
    return res.send(error);
  }
});

// UPDATE CATEGORY
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    ); // "new: true" will return the updated category

    return res.send(updatedCategory);
  } catch (error) {
    console.log("Error: ", error);
    return res.send(error);
  }
});

// DELETE CATEGORY:
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.send("Product deleted successfully");
  } catch (error) {
    console.log("Error: ", error);
    return res.send(error);
  }
});

// GET CATEGORIES: Everybody can see the categories. So this will be a public API(No authentication and no authorization).
router.get("/find/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    res.send(category);
  } catch (error) {
    console.log("Error: ", error);
    return res.send(error);
  }
});

// GET ALL CATEGORIES: Everybody can see the list of all categories. So this will be a public API(No authentication and no authorization).
router.get("/", async (req, res) => {
  try {
    let categories = await Category.find();

    res.send(categories);
  } catch (error) {
    console.log("Error: ", error);
    return res.send(error);
  }
});

module.exports = router;

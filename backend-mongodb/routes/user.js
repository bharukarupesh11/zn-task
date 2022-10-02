const router = require("express").Router();
const CryptoJs = require("crypto-js");
const User = require("../models/User");
const {
  verifyTokenAndAuthorizeUser,
  verifyTokenAndAdmin,
} = require("../middleware/verifyToken");

// API to update the user
router.put("/:id", verifyTokenAndAuthorizeUser, async (req, res) => {
  // if user is updating password then encrypt the new password again
  if (req.body.password) {
    req.body.password = CryptoJs.AES.encrypt(
      req.body.password,
      process.env.PASS_SECRET
    ).toString();
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    ); // new: true will return the updated user

    return res.send(updatedUser);
  } catch (error) {
    console.log("Error: ", error);
    return res.send(error);
  }
});

// DELETE USER: User can delete it's own account, that's why verifyTokenAndAuthorizeUser() is used
router.delete("/:id", verifyTokenAndAuthorizeUser, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.send("User deleted successfully");
  } catch (error) {
    console.log("Error: ", error);
    return res.send(error);
  }
});

// GET USER: Only admin user can see the details of any specific user
router.get("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc; // Extracting password from the user object by obj destructuring and sending only the info other than password in the response
    res.send(others);
  } catch (error) {
    console.log("Error: ", error);
    return res.send(error);
  }
});

// GET ALL USERS: Only admin user can see the details of any specific user
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const users = await User.find();

    res.send(users);
  } catch (error) {
    console.log("Error: ", error);
    return res.send(error);
  }
});

module.exports = router;

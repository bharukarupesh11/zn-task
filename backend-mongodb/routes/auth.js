const CryptoJS = require("crypto-js");
const router = require("express").Router();
const User = require("../models/User");
const CryptoJs = require("crypto-js");
const jwt = require("jsonwebtoken");

// REGISTER USER
router.post("/register", async (req, res) => {
  try {
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: CryptoJs.AES.encrypt(
        req.body.password,
        process.env.PASS_SECRET
      ).toString(),
    });

    const savedUser = await user.save();
    res.json(savedUser);
  } catch (error) {
    console.log("Error: ", error);
    res.send(error);
  }
});

// LOGIN USER
router.post("/login", async (req, res) => {
  try {
    console.log("Req Body: ", req.body);

    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(401).send("Invalid credentials"); // 401: Unauthorized

    const decryptedPassword = CryptoJs.AES.decrypt(
      user.password,
      process.env.PASS_SECRET
    ).toString(CryptoJs.enc.Utf8);

    // decrypting UI Password. Provided same secret key that was used on UI for the encryption.
    req.body.password = CryptoJS.AES.decrypt(
      req.body.password,
      process.env.UI_PASS_SECRET
    ).toString(CryptoJS.enc.Utf8);

    console.log("After Req Body: ", req.body);

    if (decryptedPassword !== req.body.password)
      return res.status(401).send("Invalid Credentials");

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET,
      { expiresIn: 3600 }
    ); // payload, private key, options(expiration time in seconds)

    const { password, ...others } = user._doc; // Extracting password from the user object by obj destructuring and sending only the info other than password in the response
    others.accessToken = accessToken; // Adding accessToken to others object

    res.send(others);
  } catch (error) {
    console.log("Error: ", error);
    res.send(error);
  }
});

module.exports = router;

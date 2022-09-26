const fs = require("fs");
const path = require("path");
const express = require("express"); // returns a function
const router = express.Router(); //returns a router object
const multer = require("multer");
const bcrypt = require("bcrypt");
const auth = require("../middleware/auth"); // here auth represents authorization but not the authentication

const db = require("../models"); // // When require is given the path of a folder, it'll look for an index.js file in that folder, if there is one, it uses that, otherwise it fails.
const User = db.user;

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "uploads");
  },
  filename: function (req, file, callback) {
    // callback(null, ` ${Date.now()}_ ${file.originalname}`)
    callback(null, ` ${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

// API to get the user details for the given user id
router.get("/:userId", auth, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId);

    if (!user) {
      return res.status(404).send({
        errorMsg: `User for id ${req.params.userId} does not exists.`,
      }); // 404 - Not Found
    }

    return res.send(user);
  } catch (ex) {
    console.log("inside user get by id catch block: ", ex);
    return res.send({ errorMsg: err.errors[0].message });
  }
});

// signup is an open api because any user can sign up to the system from login page
router.post("/signup", upload.single("file"), async (req, res) => {
  try {
    user = await User.findOne({ where: { email: req.body.email } });
    if (user)
      return res.status(409).send({
        errorMsg: `The user with email "${req.body.email}" already exists!`,
      }); // 409 - Resource already exists

    const file = req.file;

    if (!file)
      return res.status(400).send({ errorMsg: "Missing a profile image...!" });

    const salt = await bcrypt.genSalt(10); // generating salt
    req.body.password = await bcrypt.hash(req.body.password, salt); // encrypting password

    user = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      file: file.originalname,
      isAdmin: req.body.isAdmin,
    });

    return res.status(200).send({ successMsg: "User created successfully" });
  } catch (err) {
    console.log("Error occurred in create user api: ", err.errors[0].message);
    // res.send(err);  // sending the entire error object
    return res.send({ errorMsg: err.errors[0].message });
  }
});

module.exports = router; //exporting a router

const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

// Register User
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const newUser = new UserModel({ name, email, password });
    await newUser.save();

    res
      .status(201)
      .json({ success: true, message: "User registered successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "User not exists please register",
        success: false,
      });
    }

    if (password !== user.password) {
      return res.status(401).json({
        message: "Invalid Password",
        success: false,
      });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    console.log(token);

    return res.status(201).json({
      message: "User Login Successfully",
      success: true,
      data: token,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Not Working",
      success: false,
    });
  }
});

router.get("/current", async (req, res) => {
  console.log(req.url, req.method);
  console.log(req.headers["authorization"]);
  res.send({ success: true, message: "User is authenticated" });
});
module.exports = router;

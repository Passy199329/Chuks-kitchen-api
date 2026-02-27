const express = require("express");
const router = express.Router();

// Correct import path for User model
const User = require('../models/model.User');

// Sign up using Email OR Phone Number
router.post("/signup", async (req, res) => {
  const { email, phone, referralCode } = req.body;

  if (!email && !phone) {
    return res.status(400).json({ message: "Email or phone required" });
  }

  const otp = "1234"; // For demo/testing

  try {
    const newUser = await User.create({
      email,
      phone,
      referralCode,
      otp
    });

    res.json({ message: "User created", userId: newUser._id, otp });
  } catch (error) {
    res.status(400).json({ message: "Duplicate email or phone" });
  }
});

// Verify User Account
router.post("/verify", async (req, res) => {
  const { userId, otp } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user || user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    user.isVerified = true;
    user.otp = null;
    await user.save();

    res.json({ message: "Account verified" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
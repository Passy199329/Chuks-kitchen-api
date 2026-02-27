const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    sparse: true
  },
  phone: {
    type: String,
    unique: true,
    sparse: true
  },
  referralCode: String,
  otp: String,
  isVerified: {
    type: Boolean,
    default: false
  },
  role: {
    type: String,
    enum: ["customer", "admin"],
    default: "customer"
  }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
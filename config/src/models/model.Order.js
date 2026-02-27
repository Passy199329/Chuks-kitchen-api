const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  items: [
    {
      foodId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Food"
      },
      name: String,
      price: Number,
      quantity: Number
    }
  ],
  totalAmount: Number,
  status: {
    type: String,
    enum: [
      "Pending",
      "Confirmed",
      "Preparing",
      "Out for Delivery",
      "Completed",
      "Cancelled"
    ],
    default: "Pending"
  }
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
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
  ]
}, { timestamps: true });

module.exports = mongoose.model("Cart", cartSchema);
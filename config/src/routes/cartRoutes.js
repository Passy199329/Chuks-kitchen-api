const express = require("express");
const router = express.Router();
const Cart = require("../models/model.Cart");
const Food = require("../models/model.Food");

// Add to Cart route
router.post("/add", async (req, res) => {
  const { userId, foodId, quantity } = req.body;

  try {
    const food = await Food.findById(foodId);

    if (!food || !food.isAvailable) {
      return res.status(400).json({ message: "Food not available" });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = await Cart.create({ userId, items: [] });
    }

    cart.items.push({
      foodId,
      name: food.name,
      price: food.price,
      quantity
    });

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// VERY IMPORTANT: Export the router so server.js can use it
module.exports = router;
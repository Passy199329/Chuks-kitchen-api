const express = require("express");
const router = express.Router();
// Updated paths to reach your models folder
const Order = require("../models/model.Order");
const Cart = require("../models/model.Cart");

// Create a new order
router.post("/", async (req, res) => {
  const { userId } = req.body;

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    let total = 0;
    cart.items.forEach(item => {
      total += item.price * item.quantity;
    });

    const order = await Order.create({
      userId,
      items: cart.items,
      totalAmount: total
    });

    // Clear the cart
    cart.items = [];
    await cart.save();

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// Get an order by ID
router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Export the router
module.exports = router;
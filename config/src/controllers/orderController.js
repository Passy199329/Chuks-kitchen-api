// Go up to 'src', then into 'models', and pick the specific file names
const Order = require("../models/model.Order");
const Cart = require("../models/model.Cart");

exports.createOrder = async (req, res) => {
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

    cart.items = [];
    await cart.save();

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Error creating order", error: error.message });
  }
};

exports.getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Error fetching order" });
  }
};
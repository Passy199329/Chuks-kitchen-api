const Cart = require("../models/Cart");
const Food = require("../models/Food");

exports.addToCart = async (req, res) => {
  const { userId, foodId, quantity } = req.body;

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
};
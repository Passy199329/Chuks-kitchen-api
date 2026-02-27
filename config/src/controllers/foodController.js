// Up one level to src, then into models
const Food = require("../models/model.Food"); 

exports.getFoods = async (req, res) => {
  try {
    const foods = await Food.find();
    res.json(foods);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.addFood = async (req, res) => {
  try {
    const food = await Food.create(req.body);
    res.json(food);
  } catch (error) {
    res.status(400).json({ message: "Failed to add food" });
  }
};
const express = require("express");
const router = express.Router();
// We are going up one folder to 'src', then into 'models' to find 'model.Food'
const Food = require("../models/model.Food");

// GET all foods (When a user visits /api/foods)
router.get("/", async (req, res) => {
  try {
    const foods = await Food.find();
    res.json(foods);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// POST a new food (When a user sends data to /api/foods)
router.post("/", async (req, res) => {
  try {
    const food = await Food.create(req.body);
    res.json(food);
  } catch (error) {
    res.status(400).json({ message: "Failed to add food" });
  }
});

// This is the most important part! It sends this router back to server.js
module.exports = router;
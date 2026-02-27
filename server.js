require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(express.json());

// ✅ Updated paths to src/routes
app.use("/api/users", require("./config/src/routes/userRoutes"));
app.use("/api/foods", require("./config/src/routes/foodRoutes"));
app.use("/api/cart", require("./config/src/routes/cartRoutes"));
app.use("/api/orders", require("./config/src/routes/orderRoutes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
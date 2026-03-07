const express = require("express");
const path = require("path");
const connectDB = require("./init/index"); // make sure file name is db.js
const storyRoutes = require("./routes/storyRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express(); //  CREATE APP FIRST

// Connect to MongoDB
connectDB();


// middleware
app.use(express.json()); // parse application/json

// Serve static frontend files
app.use(express.static(path.join(__dirname, "public")));

// make sure JWT secret is set
if (!process.env.JWT_SECRET) {
  console.warn('WARNING: JWT_SECRET not defined in environment');
}

// API Routes
app.use("/api/stories", storyRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/premium", paymentRoutes);

// Home route
app.get("/", (req, res) => {
  res.send(" Magic Choice Stories Server is Running!");
});

// Start server
app.listen(9091, () => {
  console.log(" Server running on port 9091");
});

const express = require("express");
const path = require("path");
const connectDB = require("./init/index"); // make sure file name is db.js
const storyRoutes = require("./routes/storyRoutes");

const app = express(); //  CREATE APP FIRST

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static frontend files
app.use(express.static(path.join(__dirname, "public")));

// API Routes
app.use("/api/stories", storyRoutes);

// Home route
app.get("/", (req, res) => {
  res.send(" Magic Choice Stories Server is Running!");
});

// Start server
app.listen(9091, () => {
  console.log(" Server running on port 9091");
});

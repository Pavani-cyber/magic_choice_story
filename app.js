const express = require("express");
const path = require("path");
const session = require("express-session");
const connectDB = require("./init/index");

const storyRoutes = require("./routes/storyRoutes");
const authRoutes = require("./routes/auth");

const app = express();

//  Connect to MongoDB
connectDB();

//  Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: "secretkey",
    resave: false,
    saveUninitialized: false
}));

//  Authentication Middleware
function isAuthenticated(req, res, next) {
    if (req.session.user) {
        return next();
    }
    return res.redirect("/auth.html"); // redirect if not logged in
}

//  Default Route (IMPORTANT)
app.get("/", (req, res) => {
    if (req.session.user) {
        res.sendFile(path.join(__dirname, "public", "story.html")); // after login
    } else {
        res.sendFile(path.join(__dirname, "public", "auth.html")); // before login
    }
});

//  Auth Routes (login, register, logout)
app.use("/", authRoutes);

//  Protected Story Routes
app.use("/api/stories", isAuthenticated, storyRoutes);

// Serve Static Files (KEEP THIS LAST)
app.use(express.static(path.join(__dirname, "public")));

//  Start Server
app.listen(9091, () => {
    console.log("Server running on port 9091");
});
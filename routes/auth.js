const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.send("User already exists. Please login.");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            username,
            email,
            password: hashedPassword
        });

        await user.save();

        //  IMPORTANT: set session after register
        req.session.user = user;

        res.redirect("/index.html");

    } catch (err) {
        console.error(err);
        res.send("Error registering user");
    }
});

// LOGIN
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) return res.send("User not found");

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.send("Wrong password");

    //  set session
    req.session.user = user;

    res.redirect("/index.html");
});

// CHECK AUTH
router.get("/checkAuth", (req, res) => {
    if (req.session.user) {
        res.json({ loggedIn: true, user: req.session.user });
    } else {
        res.json({ loggedIn: false });
    }
});

// LOGOUT
router.get("/logout", (req, res) => {
    req.session.destroy(() => {
        // redirect after logout
        res.redirect("/auth.html");
    });
});

module.exports = router;
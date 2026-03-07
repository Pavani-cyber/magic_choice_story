const User = require('../models/user');
const jwt = require('jsonwebtoken');

// create JWT
function createToken(user) {
  return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: '7d'
  });
}

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email and password required' });
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already registered' });
    const user = await User.create({ email, password });
    const token = createToken(user);
    res.json({ token });
  } catch (err) {
    console.error('register error', err);
    res.status(500).json({ message: 'Registration failed' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email and password required' });
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    const match = await user.comparePassword(password);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });
    const token = createToken(user);
    res.json({ token });
  } catch (err) {
    console.error('login error', err);
    res.status(500).json({ message: 'Login failed' });
  }
};

exports.getProfile = async (req, res) => {
  if (!req.user) return res.status(401).json({ message: 'Not authenticated' });
  const { _id, email, createdAt } = req.user;
  res.json({ id: _id, email, createdAt });
};

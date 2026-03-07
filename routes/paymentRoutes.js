const express = require('express');
const router = express.Router();
const {
  createOrder,
  verifyPayment,
  getPurchases,
  checkPurchase
} = require('../controllers/paymentController');
const { authenticate } = require('../middleware/authMiddleware');

// POST /api/premium/order (requires login)
router.post('/order', authenticate, createOrder);
// POST /api/premium/verify (requires login)
router.post('/verify', authenticate, verifyPayment);
// GET /api/premium/history (optional, auth required)
router.get('/history', authenticate, getPurchases);
// GET /api/premium/check/:storyId - returns { purchased: bool }
router.get('/check/:storyId', authenticate, checkPurchase);

module.exports = router;
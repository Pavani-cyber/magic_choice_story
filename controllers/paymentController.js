const Razorpay = require('razorpay');
const crypto = require('crypto');
const Purchase = require('../models/purchase');

// razorpay instance created lazily
let razorpayInstance;
function getRazorpay() {
  if (!razorpayInstance) {
    razorpayInstance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET
    });
  }
  return razorpayInstance;
}

// create a new order for premium purchase
exports.createOrder = async (req, res) => {
  try {
    const { storyId, amount } = req.body;
    if (!storyId) return res.status(400).json({ message: 'Story id required' });
    const razorpay = getRazorpay();
    const options = {
      amount: amount || 2900, // amount in paise (₹29)
      currency: 'INR',
      receipt: `rcpt_${storyId}_${Date.now()}`
    };
    const order = await razorpay.orders.create(options);
    // record purchase in DB with status 'created'
    const purchaseData = {
      story: storyId,
      razorpayOrderId: order.id,
      amount: options.amount
    };
    if (req.user) {
      purchaseData.user = req.user._id;
      purchaseData.email = req.user.email;
    }
    const purchase = await Purchase.create(purchaseData);
    res.json({ order, purchaseId: purchase._id, key_id: process.env.RAZORPAY_KEY_ID });
  } catch (err) {
    console.error('createOrder error', err);
    res.status(500).json({ message: 'Failed to create order' });
  }
};

// verify signature sent by client after payment
exports.verifyPayment = async (req, res) => {
  try {
    const { order_id, payment_id, signature, purchaseId } = req.body;
    if (!order_id || !payment_id || !signature || !purchaseId) {
      return res.status(400).json({ message: 'Missing parameters' });
    }

    const generated_signature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(order_id + '|' + payment_id)
      .digest('hex');

    const purchase = await Purchase.findById(purchaseId);
    if (!purchase) return res.status(404).json({ message: 'Purchase not found' });

    purchase.razorpayPaymentId = payment_id;
    purchase.razorpaySignature = signature;

    if (generated_signature === signature) {
      purchase.status = 'paid';
      // record user if not already set
      if (req.user && !purchase.user) {
        purchase.user = req.user._id;
      }
      await purchase.save();
      return res.json({ success: true });
    } else {
      purchase.status = 'failed';
      await purchase.save();
      return res.status(400).json({ success: false, message: 'Invalid signature' });
    }
  } catch (err) {
    console.error('verifyPayment error', err);
    res.status(500).json({ message: 'Verification failed' });
  }
};

// optional endpoint to fetch purchase history (requires user auth)
exports.getPurchases = async (req, res) => {
  try {
    const query = {};
    if (req.user) query.user = req.user._id;
    const purchases = await Purchase.find(query).populate('story');
    res.json(purchases);
  } catch (err) {
    console.error('getPurchases error', err);
    res.status(500).json({ message: 'Failed to retrieve' });
  }
};

// API to check whether the logged-in user has a paid purchase for a story
exports.checkPurchase = async (req, res) => {
  try {
    const { storyId } = req.params;
    if (!req.user) return res.status(401).json({ message: 'Not authenticated' });
    const purchase = await Purchase.findOne({ story: storyId, user: req.user._id, status: 'paid' });
    res.json({ purchased: !!purchase });
  } catch (err) {
    console.error('checkPurchase error', err);
    res.status(500).json({ message: 'Check failed' });
  }
};
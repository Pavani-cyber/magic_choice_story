const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
  // reference to the story (object id or any identifier) so we can mark which story was purchased
  story: { type: mongoose.Schema.Types.Mixed, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // optional if authentication is added
  email: { type: String }, // fallback when no user system
  razorpayOrderId: { type: String, required: true },
  razorpayPaymentId: { type: String },
  razorpaySignature: { type: String },
  amount: { type: Number, required: true }, // paise
  status: { type: String, enum: ['created','paid','failed'], default: 'created' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Purchase', purchaseSchema);
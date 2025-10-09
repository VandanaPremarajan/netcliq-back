// models/Payment.js
const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users', 
    required: true,
  },

  subscriptionPlan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SubscriptionPlan',
    required: true,
  },

  amount: {
    type: Number,
    required: true,
  },

  paymentMethod: {
    type: String,
    enum: ['credit_card', 'paypal', 'stripe', 'cash'],
    required: true,
  },

  status: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending',
  },

  transactionId: {
    type: String, 
  },

}, { timestamps: true });

module.exports = mongoose.model('Payment', PaymentSchema);

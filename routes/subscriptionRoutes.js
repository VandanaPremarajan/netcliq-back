const express = require('express');
const router = express.Router();

const SubscriptionPlan = require('../models/SubscriptionPlan');
const Payment = require('../models/Payment');
const UserSubscription = require('../models/UserSubscription');
const User = require('../models/Users'); 

// Register a new subscription for a user
router.post('/subscribe', async (req, res) => {
  try {
    const { userId, planName, transactionId, amount } = req.body;

    // 1. Find the selected subscription plan
    const plan = Object.values(SubscriptionPlan).find(p => p.name === planName);
    if (!plan) {
      return res.status(400).json({ error: 'Invalid subscription plan' });
    }

    // 2. Create a Payment record
    const payment = new Payment({
      user: userId,
      amount,
      status: 'completed', 
      transactionId,
    });
    await payment.save();

    // 3. Create User Subscription
    const userSubscription = new UserSubscription({
      user: userId,
      planName: plan.name,
      maxDevices: plan.maxDevices,
      startDate: new Date(),
      endDate: new Date(Date.now() + plan.duration_in_days * 24 * 60 * 60 * 1000),
      payment: payment._id,
    });
    await userSubscription.save();

    // 4. Respond with subscription details
    res.status(201).json({
      message: 'Subscription registered successfully',
      subscription: userSubscription,
      payment,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all subscriptions of a user
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const subscriptions = await UserSubscription.find({ user: userId })
      .populate('payment')
      .exec();

    res.json(subscriptions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
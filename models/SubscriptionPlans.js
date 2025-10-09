const mongoose = require("mongoose");
const SubscriptionPlan = require("../constants/subscriptionPlans");

const SubscriptionPlanSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      enum: [SubscriptionPlan.BASIC.name, SubscriptionPlan.PREMIUM.name],
    },

    description: {
      type: String,
    },

    price: {
      type: Number,
      required: true,
    },

    duration_in_days: {
      type: Number,
      required: true,
    },

    device_limit: {
      type: Number,
      required: true,
    },

    max_devices: {
        type: Number,
        required: true,
    }
  },
  { timestamps: true }
);

// When creating a subscription, set max_devices automatically
SubscriptionPlanSchema.pre("validate", function (next) {
  if (this.name === SubscriptionPlan.BASIC.name) {
    this.max_devices = SubscriptionPlan.BASIC.max_devices;
  } else if (this.name === SubscriptionPlan.PREMIUM.name) {
    this.max_devices = SubscriptionPlan.PREMIUM.max_devices;
  }
  next();
});

module.exports = mongoose.model("SubscriptionPlan", SubscriptionPlanSchema);

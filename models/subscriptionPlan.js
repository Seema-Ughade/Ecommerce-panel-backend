const mongoose = require("mongoose");

const subscriptionPlanSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    cost: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number, // duration in days
      required: true,
    },
    productLimitations: {
      type: String,
      enum: ["limited", "unlimited"],
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("SubscriptionPlan", subscriptionPlanSchema);

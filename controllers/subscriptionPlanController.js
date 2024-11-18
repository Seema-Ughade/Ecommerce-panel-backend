const SubscriptionPlan = require("../models/subscriptionPlan");

// Get all subscription plans
exports.getAllPlans = async (req, res) => {
  try {
    const plans = await SubscriptionPlan.find();
    res.status(200).json(plans);
  } catch (error) {
    console.error("Error fetching plans:", error);
    res.status(500).json({ message: "Failed to fetch plans" });
  }
};

// Add a new subscription plan
exports.addPlan = async (req, res) => {
  const { title, cost, duration, productLimitations, details } = req.body;
  
  try {
    const newPlan = new SubscriptionPlan({
      title,
      cost,
      duration,
      productLimitations,
      details,
    });
    
    await newPlan.save();
    res.status(201).json(newPlan);
  } catch (error) {
    console.error("Error creating plan:", error);
    res.status(500).json({ message: "Failed to add subscription plan" });
  }
};

// Update a subscription plan
exports.updatePlan = async (req, res) => {
  const { title, cost, duration, productLimitations, details } = req.body;
  
  try {
    const updatedPlan = await SubscriptionPlan.findByIdAndUpdate(
      req.params.id,
      { title, cost, duration, productLimitations, details },
      { new: true }
    );
    
    if (!updatedPlan) {
      return res.status(404).json({ message: "Plan not found" });
    }
    
    res.status(200).json(updatedPlan);
  } catch (error) {
    console.error("Error updating plan:", error);
    res.status(500).json({ message: "Failed to update subscription plan" });
  }
};

// Delete a subscription plan
exports.deletePlan = async (req, res) => {
  try {
    const deletedPlan = await SubscriptionPlan.findByIdAndDelete(req.params.id);
    
    if (!deletedPlan) {
      return res.status(404).json({ message: "Plan not found" });
    }
    
    res.status(200).json({ message: "Plan deleted successfully" });
  } catch (error) {
    console.error("Error deleting plan:", error);
    res.status(500).json({ message: "Failed to delete subscription plan" });
  }
};

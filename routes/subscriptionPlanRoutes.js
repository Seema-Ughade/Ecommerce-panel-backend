const express = require("express");
const router = express.Router();
const subscriptionPlanController = require("../controllers/subscriptionPlanController");

// Get all subscription plans
router.get("/subscription-plans", subscriptionPlanController.getAllPlans);

// Add a new subscription plan
router.post("/subscription-plans", subscriptionPlanController.addPlan);

// Update an existing subscription plan
router.put("/subscription-plans/:id", subscriptionPlanController.updatePlan);

// Delete a subscription plan
router.delete("/subscription-plans/:id", subscriptionPlanController.deletePlan);

module.exports = router;

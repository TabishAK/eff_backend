const SubscriptionModel = require("../models/subscrptionModel");
const express = require("express");
const app = express.Router();

app.post("/", async (req, res) => {
  let user = await SubscriptionModel.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User Already Subscribed");

  const subscription = new SubscriptionModel({
    email: req.body.email,
  });

  try {
    await subscription.save();
    res.status(200).send("Subscribed Successfully!");
  } catch (err) {
    res.status(400).send("Something went wrong while subscribing");
  }
});

module.exports = app;

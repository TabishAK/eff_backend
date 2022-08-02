var mongoose = require("mongoose");
const subscriptionSchema = mongoose.Schema({
  email: { type: String, required: true },
});
module.exports = mongoose.model("Subscription", subscriptionSchema);

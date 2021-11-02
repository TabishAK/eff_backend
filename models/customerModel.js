var mongoose = require("mongoose");
const CustomerModelSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  emailToken: { type: String },
  isVerified: { type: Boolean },
});
module.exports = mongoose.model("CustomerModel", CustomerModelSchema);

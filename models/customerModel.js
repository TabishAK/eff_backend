var mongoose = require("mongoose");
const CustomerModelSchema = mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true },
  contact_no: { type: String, required: true },
  password: { type: String, required: true },
  confirm_password: { type: String, required: true },
  emailToken: { type: String },
  isVerified: { type: Boolean },
});
module.exports = mongoose.model("CustomerModel", CustomerModelSchema);

var mongoose = require("mongoose");

const ContactModel = mongoose.Schema({
  address: { type: String, required: true },
  phone_1: { type: String, required: true },
  phone_2: { type: String, required: true },
  email: { type: String, required: true },
});
module.exports = mongoose.model("Contact", ContactModel);

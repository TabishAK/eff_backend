var mongoose = require("mongoose");

const distributorsSchema = new mongoose.Schema({
  distributor_name: { type: String, required: true },
  distributor_link: { type: String, required: true },
  distributor_image: { type: String, required: false },
});

module.exports = mongoose.model("Distributors", distributorsSchema);

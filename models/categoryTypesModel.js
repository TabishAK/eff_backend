var mongoose = require("mongoose");

const categoryTypeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: false },
  slug: { type: String, required: true },
});

module.exports = mongoose.model("CategoryType", categoryTypeSchema);

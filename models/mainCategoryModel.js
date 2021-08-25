var mongoose = require("mongoose");

const mainCategorySchema = new mongoose.Schema({
  category_name: { type: String, required: false },
});

module.exports = mongoose.model("MainCategory", mainCategorySchema);

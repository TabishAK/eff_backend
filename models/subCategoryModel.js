var mongoose = require("mongoose");

const subCategorySchema = new mongoose.Schema({
  subCategory_name: { type: String, required: true },
  subCategory_slug: { type: String, required: true },
  mainCategory: {
    type: mongoose.SchemaTypes.ObjectId,
    required: false,
    ref: "MainCategory",
  },
});

module.exports = mongoose.model("SubCategory", subCategorySchema);

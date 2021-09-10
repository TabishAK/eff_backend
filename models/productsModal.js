var mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  product_name: { type: String, required: true },
  product_creative_image: { type: String, required: true },
  product_broucher_image: { type: String, required: true },
  product_description: { type: String, required: false },

  product_slug: { type: String, required: true },
  subCategory: {
    type: mongoose.SchemaTypes.ObjectId,
    required: false,
    ref: "SubCategory",
  },
});

module.exports = mongoose.model("Products", productSchema);

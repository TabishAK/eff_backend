var mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  product_name: { type: String, required: true },
  product_image: { type: String, required: true },
  product_slug: { type: String, required: true },
  subCategory: {
    type: mongoose.SchemaTypes.ObjectId,
    required: false,
    ref: "SubCategory",
  },
});

module.exports = mongoose.model("Products", productSchema);

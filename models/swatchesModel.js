var mongoose = require("mongoose");

const swatchSchema = new mongoose.Schema({
  swatch_name: { type: String, required: true },
  swatch_image: { type: String, required: false },
  swatch_slug: { type: String, required: false },
  product: {
    type: mongoose.SchemaTypes.ObjectId,
    required: false,
    ref: "Products",
  },
});

module.exports = mongoose.model("Swatches", swatchSchema);

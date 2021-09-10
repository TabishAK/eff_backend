var mongoose = require("mongoose");

const swatchSchema = new mongoose.Schema({
  swatch_name: { type: String, required: false },
  swatch_image: { type: String, required: false },
  products: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: "Products",
  },
});

module.exports = mongoose.model("Swatches", swatchSchema);

var mongoose = require("mongoose");

const imageArray = new mongoose.Schema({
  swatch_image: { type: String, required: false },
});

const swatchSchema = new mongoose.Schema({
  swatches: [imageArray],
  products: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: "Products",
  },
});

module.exports = mongoose.model("Swatches", swatchSchema);

var mongoose = require("mongoose");

const swatcheSchema = new mongoose.Schema({
  swatch_name: { type: String, required: false },
  swatch_image: { type: String, required: false },
});

const broucherSchema = new mongoose.Schema({
  broucher_image: { type: String, required: false },
  broucher_image: { type: String, required: false },
  swatches: [swatcheSchema],
});

module.exports = mongoose.model("Broucher", broucherSchema);

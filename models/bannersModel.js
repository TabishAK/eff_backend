var mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema({
  video: { type: String, required: true },
  image_1: { type: String, required: true },
  image_2: { type: String, required: true },
  image_3: { type: String, required: true },
});

module.exports = mongoose.model("Banner", bannerSchema);

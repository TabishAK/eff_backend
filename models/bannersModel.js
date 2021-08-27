var mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  image_name: { type: String, required: true },
  image_url: { type: String, required: false },
});

const bannerSchema = new mongoose.Schema({
  video: { type: String, required: true },
  images: [imageSchema],
});

module.exports = mongoose.model("Banner", bannerSchema);

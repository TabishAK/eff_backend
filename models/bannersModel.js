var mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema({
  video: { type: String, required: false },
  image_1: { type: String, required: false },
  image_2: { type: String, required: false },
  image_3: { type: String, required: false },
});

module.exports = mongoose.model("Banner", bannerSchema);

var mongoose = require("mongoose");

const homePageContentSchema = new mongoose.Schema({
  para_below_logo: { type: String, required: false },
  image_1: { type: String, required: false },
  image_2: { type: String, required: false },
  image_3: { type: String, required: false },
  image_4: { type: String, required: false },
});

module.exports = mongoose.model("HomePageContent", homePageContentSchema);

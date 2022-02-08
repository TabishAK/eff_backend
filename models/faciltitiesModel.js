var mongoose = require("mongoose");

const aboutArray = new mongoose.Schema({
  about_main: { type: String, required: false },
  main_description: { type: String, required: false },
});

const featuresArray = new mongoose.Schema({
  feature_name: { type: String, required: false },
  feature_detail: { type: String, required: false },
});

const faclitiesSchema = new mongoose.Schema({
  mainHeading: { type: String, required: false },
  whoAreWe: { type: String, required: false },
  features: [featuresArray],
  about_company: [aboutArray],
});

module.exports = mongoose.model("Facilities", faclitiesSchema);

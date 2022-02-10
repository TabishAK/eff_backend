var mongoose = require("mongoose");

const processArray = new mongoose.Schema({
  process_name: { type: String, required: false },
  process_description: { type: String, required: false },
});

const serviceArray = new mongoose.Schema({
  service_name: { type: String, required: false },
  service_description: { type: String, required: false },
});

const ServiceSchema = new mongoose.Schema({
  slug: { type: String, required: false },
  services: [serviceArray],
  process: [processArray],
  mainParagraph: { type: String, required: false },
  capabilities: { type: String, required: false },
});

module.exports = mongoose.model("Service", ServiceSchema);

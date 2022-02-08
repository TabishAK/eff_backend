var mongoose = require("mongoose");

const benefitArray = new mongoose.Schema({
  benefit_name: { type: String, required: false },
  benefit_details: { type: String, required: false },
});

const jobsArray = new mongoose.Schema({
  job_name: { type: String, required: false },
  designation_name: { type: String, required: false },
  area: { type: String, required: false },
  country: { type: String, required: false },
  job_type: { type: String, required: false },
});

const careerSchema = new mongoose.Schema({
  firstPara: { type: String, required: false },
  benefits: [benefitArray],
  jobs: [jobsArray],
});

module.exports = mongoose.model("Careers", careerSchema);

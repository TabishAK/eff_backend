var mongoose = require("mongoose");

const JobApplyFormModel = mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true },
  contact_no: { type: String, required: true },
  job_post: { type: String, required: true },
  resume: { type: String, required: true },
  userID: { type: String },
});

module.exports = mongoose.model("JobApplyFormModel", JobApplyFormModel);

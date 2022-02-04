var mongoose = require("mongoose");

const aboutUsModel = new mongoose.Schema({
  para1: { type: String, required: false },
  para2: { type: String, required: false },
  para3: { type: String, required: false },
  para4: { type: String, required: false },
  para5: { type: String, required: false },
});

module.exports = mongoose.model("AboutUs", aboutUsModel);

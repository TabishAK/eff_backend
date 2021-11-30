const ApplyJobModel = require("../models/applyJobModel");
const express = require("express");
const app = express.Router();
var _ = require("lodash");
const multer = require("multer");
const fs = require("fs");
const { uploadFile } = require("../services/s3");
const upload = multer({ dest: "uploads/" });

// Add category
app.post("/", upload.single("resume"), async (req, res) => {
  const obj = JSON.parse(JSON.stringify(req.body));
  const { first_name, last_name, email, contact_no, job_post, userID } = obj;

  const file = JSON.parse(JSON.stringify(req.file));

  try {
    const folder = `pdf/resumes/${userID}`;
    result = await uploadFile(file, folder, "application/pdf");
    fs.unlinkSync(file.path);

    if (!result) return res.status(400).send("Broucher could not be saved ");
  } catch (err) {
    console.log(err);
  }

  const applyJobModel = new ApplyJobModel({
    first_name: first_name,
    last_name: last_name,
    email: email,
    resume: result && result.Location,
    job_post: job_post,
    contact_no: contact_no,
    userID: userID,
  });

  applyJobModel
    .save()
    .then((c) => {
      res.status(200).json({
        message: "Job Applied",
        subCategory: c,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});
module.exports = app;

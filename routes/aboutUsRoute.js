const AboutUsModel = require("../models/aboutUsModel");
const express = require("express");
const app = express.Router();

app.get("/", async (req, res) => {
  AboutUsModel.findOne()
    .exec()
    .then((p) => {
      res.status(200).send(p);
    })
    .catch((e) => {
      res.send({ e });
    });
});

app.post("/add", async (req, res) => {
  const data = await AboutUsModel.findOne();
  if (data) {
    res.status(200).json({
      message: "This paragraph already exist, first deleted and then add.",
    });
  } else {
    const m = new AboutUsModel({
      para1: req.body.para1,
      para2: req.body.para2,
      para3: req.body.para3,
      para4: req.body.para4,
      para5: req.body.para5,
    });

    m.save()
      .then((c) => {
        res.status(200).json({
          message: "About Us Content Created..",
          mainCategory: c,
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  }
});

app.delete("/delete", async (req, res) => {
  AboutUsModel.deleteOne({ _id: req.body._id })
    .then((p) => {
      res.status(200).send(p);
    })
    .catch((e) => {
      res.send({ e });
    });
});

app.put("/update", async (req, res) => {
  AboutUsModel.updateOne({ _id: req.body._id }, req.body, (error, success) => {
    if (error) {
      res.send({
        message: "Update fail !",
        error,
      });
    } else {
      res.send({
        message: "Successfuly updated !",
        success,
      });
    }
  });
});

module.exports = app;

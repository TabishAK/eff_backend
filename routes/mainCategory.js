const MainCategoryModel = require("../models/mainCategoryModel");
const express = require("express");
const app = express.Router();

app.post("/add", async (req, res) => {
  const availMainCategory = await MainCategoryModel.findOne({
    category_name: req.body.category_name,
  });

  if (availMainCategory)
    return res.status(400).send("This category already exists");

  const m = new MainCategoryModel({
    category_name: req.body.category_name,
  });

  m.save()
    .then((c) => {
      res.status(200).json({
        message: "Main Category Created",
        mainCategory: c,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

app.get("/", async (req, res) => {
  MainCategoryModel.find()
    .exec()
    .then((p) => {
      console.log(p);
      res.status(200).send(p);
    })
    .catch((e) => {
      res.send({ e });
    });
});

module.exports = app;
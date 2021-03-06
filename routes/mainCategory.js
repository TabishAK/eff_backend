const MainCategoryModel = require("../models/mainCategoryModel");
const express = require("express");
const app = express.Router();
const auth = require("../Middlewares/auth");

app.post("/add", auth, async (req, res) => {
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
      res.status(200).send(p);
    })
    .catch((e) => {
      res.send({ e });
    });
});

app.delete("/delete", auth, async (req, res) => {
  console.log(req.body);
  MainCategoryModel.deleteOne({ _id: req.body._id })
    .then((p) => {
      res.status(200).send(p);
    })
    .catch((e) => {
      res.send({ e });
    });
});

app.put("/update", auth, async (req, res) => {
  MainCategoryModel.updateOne(
    { _id: req.body._id },
    req.body,
    (error, success) => {
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
    }
  );
});

module.exports = app;

const SubCategoryModel = require("../models/subCategoryModel");
const express = require("express");
const app = express.Router();
var _ = require("lodash");

// Add category
app.post("/add", async (req, res) => {
  const { subCategory_name, subCategory_slug, mainCategory } = req.body;

  const subCategoryAvailable = await SubCategoryModel.findOne({
    subCategory_name: subCategory_name,
  });

  if (subCategoryAvailable)
    return res.status(400).send("This category already exists");

  const subCategory = new SubCategoryModel({
    subCategory_name: subCategory_name,
    subCategory_slug: subCategory_slug,
    mainCategory: mainCategory,
  });

  subCategory
    .save()
    .then((c) => {
      res.status(200).json({
        message: "Subcategory Created",
        subCategory: c,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

//Get Category
app.post("/", async (req, res) => {
  SubCategoryModel.find(req.body)
    .populate("mainCategory")
    .exec()
    .then((p) => {
      res.status(200).send(p);
    })
    .catch((e) => {
      res.send({ e });
    });
});

app.delete("/delete", async (req, res) => {
  const { _id } = req.body;
  SubCategoryModel.deleteOne({ _id: _id })
    .then((p) => {
      res.status(200).send(p);
    })
    .catch((e) => {
      res.send({ e });
    });
});

app.put("/update", async (req, res) => {
  SubCategoryModel.updateOne(
    { _id: req.body._id },
    req.body,
    async (error, success) => {
      if (error) {
        res.send({
          message: "Update fail! Maybe this sub-category already exists",
        });
      } else {
        res.send({
          message: "Successfuly updated !",
        });
      }
    }
  );
});

module.exports = app;

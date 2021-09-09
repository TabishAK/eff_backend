const SubCategoryModel = require("../models/subCategoryModel");
const express = require("express");
const multer = require("multer");
const app = express.Router();

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
app.get("/", async (req, res) => {
  SubCategoryModel.find()
    .populate("mainCategory")
    .exec()
    .then((p) => {
      console.log(p);
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
  const { _id, subCategory_name, subCategory_slug, mainCategory } = req.body;

  const subCatAvailable = await SubCategoryModel.findOne({
    subCategory_name: subCategory_name,
  });

  if (subCatAvailable)
    return res.status(400).send("This Product already exists");

  SubCategoryModel.findByIdAndUpdate(
    { _id: _id },
    {
      $set: {
        subCategory_name: subCategory_name,
        subCategory_slug: subCategory_slug,
        mainCategory: mainCategory,
      },
    }
  )
    .then((p) => {
      res.status(200).send(p);
    })
    .catch((e) => {
      res.send({ e });
    });
});

module.exports = app;

const SubCategoryModel = require("../models/subCategoryModel");
const express = require("express");
const app = express.Router();
var _ = require("lodash");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const fs = require("fs");
const { uploadFile } = require("../services/s3");

// Add category
app.post(
  "/add",
  upload.fields([{ name: "pdf" }, { name: "subCategory_image" }]),
  async (req, res) => {
    const { subCategory_name, subCategory_slug, mainCategory } = req.body;

    const subCategoryAvailable = await SubCategoryModel.findOne({
      subCategory_name: subCategory_name,
    });

    let result;

    if (subCategoryAvailable)
      return res.status(400).send("This category already exists");
    if (
      req.files.pdf !== undefined ||
      req.files.subCategory_image !== undefined
    ) {
      return res.status(400).send("Broucher could not be Empty ");
    }

    try {
      const folder = `pdf/${subCategory_name}/`;
      const file = req.files.pdf[0];
      result = await uploadFile(file, folder, "application/pdf");
      fs.unlinkSync(file.path);

      const folder2 = `Brouchers Image/${subCategory_name}/`;
      const file2 = req.files.subCategory_image[0];
      result2 = await uploadFile(file2, folder2, "image/jpeg");
      fs.unlinkSync(file2.path);

      if (!result) return res.status(400).send("Broucher could not be saved ");

      if (!result2) return res.status(400).send("Broucher could not be saved ");
    } catch (err) {
      console.log(err);
    }

    const subCategory = new SubCategoryModel({
      subCategory_name: subCategory_name,
      subCategory_slug: subCategory_slug,
      pdf: result && result.Location,
      subCategory_image: result2 && result2.Location,
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
  }
);

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

app.put(
  "/update",
  upload.fields([{ name: "pdf" }, { name: "subCategory_image" }]),
  async (req, res) => {
    try {
      if (req.files.pdf !== undefined) {
        const folder = `pdf/${req.body._id}`;
        const file = req.files.pdf[0];
        const result = await uploadFile(file, folder, "application/pdf");
        fs.unlinkSync(file.path);
        req.body.pdf = result.Location;
      }

      if (req.files.subCategory_image !== undefined) {
        const folder2 = `Brouchers Image/${req.body._id}`;
        const file2 = req.files.subCategory_image[0];
        const result2 = await uploadFile(file2, folder2, "image/jpeg");
        fs.unlinkSync(file2.path);
        req.body.subCategory_image = result2.Location;
      }
    } catch (err) {
      console.log(err);
    }

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
  }
);

module.exports = app;

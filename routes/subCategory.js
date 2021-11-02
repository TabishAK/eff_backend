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
    const obj = JSON.parse(JSON.stringify(req.body));
    const { subCategory_name, subCategory_slug, mainCategory } = obj;

    const obj2 = JSON.parse(JSON.stringify(req.files));

    console.log(obj);
    console.log(obj2);

    const subCategoryAvailable = await SubCategoryModel.findOne({
      subCategory_name: subCategory_name,
    });

    let result;

    if (subCategoryAvailable)
      return res.status(400).send("This category already exists");

    try {
      const folder = `pdf/${subCategory_name}/`;
      const file = obj2.pdf[0];
      result = await uploadFile(file, folder, "application/pdf");
      fs.unlinkSync(file.path);

      const folder2 = `${obj._id}/Subcategory Images/${obj.subCategory_name}`;
      const file2 = obj2.subCategory_image[0];
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
app.get("/", async (req, res) => {
  SubCategoryModel.find()
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
    const obj = JSON.parse(JSON.stringify(req.body));
    const obj2 = JSON.parse(JSON.stringify(req.files));

    const temp = _.isEmpty(obj2);

    if (temp === false) {
      try {
        if (obj2.pdf !== undefined) {
          const folder = `pdf/${obj._id}`;
          const file = obj2.pdf[0];
          const result = await uploadFile(file, folder, "application/pdf");
          fs.unlinkSync(file.path);
          obj.pdf = result.Location;
        }
        if (obj2.subCategory_image !== undefined) {
          const folder2 = `${obj._id}/Subcategory Images/${obj.subCategory_name}`;
          const file2 = obj2.subCategory_image[0];
          const result2 = await uploadFile(file2, folder2, "image/jpeg");
          fs.unlinkSync(file2.path);
          obj.subCategory_image = result2.Location;
        }
      } catch (err) {
        console.log(err);
      }
    }

    SubCategoryModel.updateOne(
      { _id: obj._id },
      obj,
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

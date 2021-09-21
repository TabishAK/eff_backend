const ProductModel = require("../models/productsModal");
const express = require("express");
const app = express.Router();
const multer = require("multer");
const { uploadFile } = require("../services/s3");
const fs = require("fs");
const upload = multer({ dest: "uploads/" });
const _ = require("lodash");

app.post(
  "/add",
  upload.fields([
    { name: "product_creative_image" },
    { name: "product_broucher_image" },
  ]),
  async (req, res) => {
    const { product_name, product_slug, subCategory, product_description } =
      req.body;

    const productAvailable = await ProductModel.findOne({
      product_name: product_name,
    });

    if (productAvailable)
      return res.status(400).send("This Product already exists");

    const folder1 = `${subCategory}/${product_name}/Creative Image/`;
    const folder2 = `${subCategory}/${product_name}/Broucher Image/`;
    const file = req.files.product_creative_image[0];
    const result = await uploadFile(file, folder1, "image/jpeg");
    fs.unlinkSync(file.path);

    if (!result)
      return res.status(400).send("Creative image could not be saved");

    const file2 = req.files.product_broucher_image[0];
    const result2 = await uploadFile(file2, folder2, "image/jpeg");
    fs.unlinkSync(file2.path);

    if (!result2)
      return res.status(400).send("Broucher image could not be saved ");

    const products = new ProductModel({
      product_name: product_name,
      product_creative_image: result.Location,
      product_broucher_image: result2.Location,
      product_slug: product_slug,
      subCategory: subCategory,
      product_description: product_description,
    });

    products
      .save()
      .then((c) => {
        res.status(200).json({
          message: "Products Created",
          products: c,
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  }
);

//Get Products
app.post("/", async (req, res) => {
  ProductModel.find(req.body)
    .populate("subCategory")
    .exec()
    .then((p) => {
      res.status(200).send(p);
    })
    .catch((e) => {
      res.send({ e });
    });
});

app.delete("/delete", async (req, res) => {
  const { _id, product_image } = req.body;
  ProductModel.deleteOne({ _id: _id })
    .then((p) => {
      res.status(200).send(p);
    })
    .catch((e) => {
      res.send({ e });
    });
});

app.post("/getFromSlug", async (req, res) => {
  // console.log(req);
  const h = await ProductModel.find().populate("subCategory");
  const agaya = h.filter((aich) => {
    return aich.subCategory.subCategory_slug === req.body.slug;
  });
  if (agaya) {
    Promise.all(agaya).then((result) => {
      res.status(200).send(result);
    });
  } else {
    res.status(200).send("No Object Found");
  }
});

app.put(
  "/update",
  upload.fields([
    { name: "product_creative_image" },
    { name: "product_broucher_image" },
  ]),
  async (req, res) => {
    try {
      if (req.files.product_creative_image !== undefined) {
        const folder1 = `${req.body.subCategory}/${req.body.product_name}/Creative Image/`;
        const file = req.files.product_creative_image[0];
        const result = await uploadFile(file, folder1, "image/jpeg");
        fs.unlinkSync(file.path);
        req.body.product_creative_image = result.Location;
      }
      if (req.files.product_broucher_image !== undefined) {
        const folder2 = `${req.body.subCategory}/${req.body.product_name}/Broucher Image/`;
        const file2 = req.files.product_broucher_image[0];
        const result2 = await uploadFile(file2, folder2, "image/jpeg");
        fs.unlinkSync(file2.path);
        req.body.product_broucher_image = result2.Location;
      }
    } catch (err) {
      console.log(err);
    }
    const hell = JSON.parse(JSON.stringify(req.body));
    ProductModel.updateOne({ _id: req.body._id }, hell, (error, success) => {
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
  }
);

module.exports = app;

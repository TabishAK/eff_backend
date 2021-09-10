const ProductModel = require("../models/productsModal");
const express = require("express");
const app = express.Router();
const multer = require("multer");
const { uploadFile } = require("../services/s3");
const fs = require("fs");
const upload = multer({ dest: "uploads/" });
const folder = "products/";

app.post(
  "/add",
  upload.fields([
    { name: "product_creative" },
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

    const file = req.files.product_creative[0];
    const result = await uploadFile(file, folder);
    fs.unlinkSync(file.path);

    const file2 = req.files.product_broucher_image[0];
    const result2 = await uploadFile(file2, folder);
    fs.unlinkSync(file2.path);

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
app.get("/", async (req, res) => {
  ProductModel.find()
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
  const { _id, product_image } = req.body;
  ProductModel.deleteOne({ _id: _id })
    .then((p) => {
      fs.unlinkSync(product_image);
      res.status(200).send(p);
    })
    .catch((e) => {
      res.send({ e });
    });
});

app.put("/update", async (req, res) => {
  const { _id, product_name, product_slug, subCategory } = req.body;
  const productAvailable = await ProductModel.findOne({
    product_name: product_name,
  });

  if (productAvailable)
    return res.status(400).send("This Product already exists");

  const file = req.file;
  const result = await uploadFile(file, folder);

  if (!result)
    res.status(400).send({ message: "Pic not uploaded as well as data" });

  ProductModel.findOneAndUpdate(
    { _id: _id },
    {
      $set: {
        product_name: product_name,
        product_slug: product_slug,
        product_image: result.Location,
        subCategory: subCategory,
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

const ProductModel = require("../models/productsModal");
const express = require("express");
const app = express.Router();
const multer = require("multer");
const { uploadFile } = require("../services/s3");
const fs = require("fs");
const upload = multer({ dest: "uploads/" });
const _ = require("lodash");
const auth = require("../Middlewares/auth");

app.post(
  "/add",
  auth,
  upload.fields([
    { name: "product_creative_image" },
    { name: "product_broucher_image" },
  ]),
  async (req, res) => {
    const { product_name, product_slug, subCategory, product_description } =
      req.body;

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

    await products
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
    .populate("subCategory")
    .exec()
    .then((p) => {
      res.status(200).send(p);
    })
    .catch((e) => {
      res.send({ e });
    });
});

app.post("/getWithPagination", async (req, res) => {
  let count = await ProductModel.countDocuments();
  const nav = Math.ceil(count / req.body.pageSize);
  ProductModel.find()
    .populate("subCategory")
    .skip((req.body.pageNumber - 1) * req.body.pageSize)
    .limit(req.body.pageSize)
    .exec()
    .then((p) => {
      res.status(200).send({ p, nav });
    })
    .catch((e) => {
      res.send({ e });
    });
});

app.delete("/delete", auth, async (req, res) => {
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
  auth,
  upload.fields([
    { name: "product_creative_image" },
    { name: "product_broucher_image" },
  ]),
  async (req, res) => {
    const obj = JSON.parse(JSON.stringify(req.body));
    const obj2 = JSON.parse(JSON.stringify(req.files));
    const temp = _.isEmpty(obj2);

    if (temp === false) {
      try {
        if (obj2.product_creative_image !== undefined) {
          const folder1 = `${obj.subCategory}/${obj.product_name}/Creative Image/`;
          const file = obj2.product_creative_image[0];
          const result = await uploadFile(file, folder1, "image/jpeg");
          fs.unlinkSync(file.path);
          obj.product_creative_image = result.Location;
        }
        if (obj2.product_broucher_image !== undefined) {
          const folder2 = `${obj.subCategory}/${obj.product_name}/Broucher Image/`;
          const file2 = obj2.product_broucher_image[0];
          const result2 = await uploadFile(file2, folder2, "image/jpeg");
          fs.unlinkSync(file2.path);
          obj.product_broucher_image = result2.Location;
        }
      } catch (err) {
        console.log(err);
      }
    }

    const hell = JSON.parse(JSON.stringify(obj));
    ProductModel.updateOne({ _id: obj._id }, hell, (error, success) => {
      if (error) {
        res.send({
          message: "Update fail!",
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

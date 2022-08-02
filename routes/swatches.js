const Swatch = require("../models/swatchesModel");
const express = require("express");
const app = express.Router();
const multer = require("multer");

const ProductsModel = require("../models/productsModal");
const { uploadFile } = require("../services/s3");
const upload = multer({ dest: "uploads/" });
const fs = require("fs");
const _ = require("lodash");
const auth = require("../Middlewares/auth");

app.post("/add", auth, upload.array("swatch_image"), async (req, res) => {
  const s = await Swatch.find({});
  if (s) {
    const { products } = req.body;
    var swatches = [];
    var PM = await ProductsModel.findOne({ _id: products });
    var sw = await Swatch.findOne({ products: products });

    if (sw) {
      return res
        .status(400)
        .send({ message: "The swatch of this product already exist." });
    }

    const folder = `${PM.subCategory}/${PM.product_name}/swatches/`;
    const agaya = req.files.map(async (r) => {
      let result = await uploadFile(r, folder, "image/jpeg");
      fs.unlinkSync(r.path);
      return result;
    });
    const arr = await Promise.all(agaya);
    arr.map((s) => {
      swatches.push({ swatch_image: s.Location });
    });
    const swatch = new Swatch({
      swatches: swatches,
      products: products,
    });
    swatch
      .save()
      .then((c) => {
        res.status(200).json({
          message: "Swatch Created",
          swatch: c,
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  } else {
    res.status(400).send("Swatches Alreay Added. Delete First And add again");
  }
});

//Get Category
app.get("/", async (req, res) => {
  Swatch.find()
    .populate({
      path: "products",
      //   populate: {
      //     path: "subCategory",
      //   },
    })
    .exec()
    .then((p) => {
      res.status(200).send(p);
    })
    .catch((e) => {
      res.send({ e });
    });
});

app.post("/getFromSlug", async (req, res) => {
  console.log(req.body.slug);
  const h = await Swatch.find().populate({
    path: "products",
    populate: {
      path: "subCategory",
    },
  });
  const agaya = h.filter((aich) => {
    return aich.products.product_slug === req.body.slug;
  });
  Promise.all(agaya).then((result) => {
    res.status(200).send(result);
  });
});

app.delete("/delete", auth, async (req, res) => {
  const { _id } = req.body;
  Swatch.deleteOne({ _id: _id })
    .then((p) => {
      res.status(200).send(p);
    })
    .catch((e) => {
      res.send({ e });
    });
});

app.put("/update", auth, upload.array("swatch_image"), async (req, res) => {
  const obj = JSON.parse(JSON.stringify(req.body));
  const obj2 = JSON.parse(JSON.stringify(req.files));

  var swatches = [];
  var PM = await ProductsModel.findOne({ _id: obj.products });
  const folder = `${PM.subCategory}/${PM.product_name}/swatches/`;

  const temp = _.isEmpty(obj2);
  if (temp !== true) {
    const agaya = req.files.map(async (r, i) => {
      let result = await uploadFile(r, folder, "image/jpeg");
      fs.unlinkSync(r.path);
      return result;
    });

    const arr = await Promise.all(agaya);

    arr.map((s) => {
      swatches.push({ swatch_image: s.Location });
    });
  }

  const aikobj = { swatches: swatches, products: obj.products };

  Swatch.updateOne({ _id: obj._id }, aikobj, (error, success) => {
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

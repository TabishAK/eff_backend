const BroucherModel = require("../models/swatchesModel");
const express = require("express");
const app = express.Router();
const multer = require("multer");

const { uploadFile } = require("../services/s3");
const upload = multer({ dest: "uploads/" });

// Add category
app.post("/add", upload.single("swatch_image"), async (req, res) => {
  const url = req.file.path.replace(/\\/g, "/");
  const { swatch_name, swatch_slug, product } = req.body;
  const availSwatch = await BroucherModel.findOne({
    swatch_name: swatch_name,
  });

  if (availSwatch) return res.status(400).send("This category already exists");

  const swatch = new BroucherModel({
    swatch_name: swatch_name,
    swatch_image: url,
    swatch_slug: swatch_slug,
    product: product,
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
});

//Get Category
app.get("/", async (req, res) => {
  BroucherModel.find()
    .populate({
      path: "product",
      populate: {
        path: "subCategory",
      },
    })
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
  const { _id, swatch_image } = req.body;
  BroucherModel.deleteOne({ _id: _id })
    .then((p) => {
      fs.unlinkSync(swatch_image);
      res.status(200).send(p);
    })
    .catch((e) => {
      res.send({ e });
    });
});

app.put("/update", upload.single("swatch_image"), async (req, res) => {
  const url = req.file.path.replace(/\\/g, "/");
  const { _id, swatch_name, swatch_slug, product } = req.body;

  BroucherModel.findByIdAndUpdate(
    { _id: _id },
    {
      $set: {
        swatch_name: swatch_name,
        swatch_slug: swatch_slug,
        swatch_image: url,
        product: product,
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

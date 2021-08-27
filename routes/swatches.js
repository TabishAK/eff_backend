const SwatchesModel = require("../models/swatchesModel");
const express = require("express");
const app = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/swatches");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

// Add category
app.post("/add", upload.single("swatch_image"), async (req, res) => {
  const url = req.file.path.replace(/\\/g, "/");
  const { swatch_name, swatch_slug, product } = req.body;
  const availSwatch = await SwatchesModel.findOne({
    swatch_name: swatch_name,
  });

  if (availSwatch) return res.status(400).send("This category already exists");

  const swatch = new SwatchesModel({
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
  SwatchesModel.find()
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

module.exports = app;

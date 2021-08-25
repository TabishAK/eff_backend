const ProductModel = require("../models/productsModal");
const express = require("express");
const app = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/products");
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
app.post("/add", upload.single("product_image"), async (req, res) => {
  const url = `http://localhost:8000/` + req.file.path.replace(/\\/g, "/");
  const { product_name, product_slug, subCategory } = req.body;
  const category = await ProductModel.findOne({ product_name: product_name });

  if (category) return res.status(400).send("This category already exists");

  const products = new ProductModel({
    product_name: product_name,
    product_image: url,
    product_slug: product_slug,
    subCategory: subCategory,
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
});

//Get Category
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

module.exports = app;

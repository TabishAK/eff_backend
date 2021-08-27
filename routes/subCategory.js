const SubCategoryModel = require("../models/subCategoryModel");
const express = require("express");
const multer = require("multer");
const app = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/subCategory");
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
app.post("/add", upload.single("subCategory_image"), async (req, res) => {
  const url = req.file.path.replace(/\\/g, "/");
  const { subCategory_name, subCategory_slug, mainCategory } = req.body;

  const subCategoryAvailable = await SubCategoryModel.findOne({
    subCategory_name: subCategory_name,
  });

  if (subCategoryAvailable)
    return res.status(400).send("This category already exists");

  const subCategory = new SubCategoryModel({
    subCategory_name: subCategory_name,
    subCategory_image: url,
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

module.exports = app;

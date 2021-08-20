const CategoryType = require("../models/categoryTypesModel");
const express = require("express");
const app = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

app.post("/add", upload.single("catImg"), async (req, res, next) => {
  console.log(req.file);
  //   console.log(req.body.name);

  //   const { name, image, slug } = req.body;

  //   const category = await CategoryType.findOne({ name: name });
  //   if (category) return res.status(400).send("This category already exists");

  //   const categorytype = new CategoryType({
  //     name: name,
  //     image: image,
  //     slug: slug,
  //   });

  //   categorytype
  //     .save()
  //     .then((c) => {
  //       res.status(200).json({
  //         message: "Category Created",
  //         c,
  //       });
  //     })
  //     .catch((err) => {
  //       res.status(500).json({
  //         error: err,
  //       });
  //     });
  // });

  // app.get("/", async (req, res) => {
  //   CategoryType.find()
  //     .exec()
  //     .then((categories) => {
  //       console.log(categories);
  //       res.status(200).send(categories);
  //     })
  //     .catch((e) => {
  //       res.send({ e });
  //     });
});

module.exports = app;

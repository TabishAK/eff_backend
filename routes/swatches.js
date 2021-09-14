const Swatch = require("../models/swatchesModel");
const express = require("express");
const app = express.Router();
const multer = require("multer");
const ProductsModel = require("../models/productsModal");
const { uploadFile } = require("../services/s3");
const upload = multer({ dest: "uploads/" });
const fs = require("fs");

app.post("/add", upload.array("swatch_image"), async (req, res) => {
  const s = await Swatch.find({});

  if (s) {
    const { products } = req.body;
    var swatches = [];
    var PM = await ProductsModel.findOne({ _id: products });
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
    // .populate({
    //   path: "product",
    //   populate: {
    //     path: "subCategory",
    //   },
    // })
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
  const { _id } = req.body;
  Swatch.deleteOne({ _id: _id })
    .then((p) => {
      res.status(200).send(p);
    })
    .catch((e) => {
      res.send({ e });
    });
});

// app.put("/update", upload.single("swatch_image"), async (req, res) => {
//   var swatches = [];
//   var PM = await ProductsModel.findOne({ _id: products });
//   const folder = `${PM.subCategory}/${PM.product_name}/swatches/`;

//   const agaya = req.files.map(async (r, i) => {
//     fs.unlinkSync(r.path);
//     let result = await uploadFile(r, folder);
//     return result;
//   });

//   const arr = await Promise.all(agaya);

//   arr.map((s) => {
//     swatches.push({ swatch_image: s.Location });
//   });

//   Swatch.updateOne({ _id: req.body._id }, hell, (error, success) => {
//     if (error) {
//       res.send({
//         message: "Update fail !",
//         error,
//       });
//     } else {
//       res.send({
//         message: "Successfuly updated !",
//         success,
//       });
//     }
//   });
// });

module.exports = app;

const Banner = require("../models/bannersModel");
const express = require("express");
const app = express.Router();
const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/banners");
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
  // limits: {
  //   fileSize: 1024 * 1024 * 5,
  // },
});

// Add products
app.post("/add", upload.array("product_image"), async (req, res) => {
  const banner = await Banner.find();
  if (!banner) {
    new Banner({
      video: req.files[0].path.replace(/\\/g, "/"),
      image_1: req.files[1].path.replace(/\\/g, "/"),
      image_2: req.files[2].path.replace(/\\/g, "/"),
      image_3: req.files[3].path.replace(/\\/g, "/"),
    })
      .save()
      .then((p) => {
        res.status(200).send(p);
      })
      .catch((e) => {
        res.send({ e });
      });
  }

  if (banner) {
    try {
      fs.unlinkSync(banner[0].video);
      fs.unlinkSync(banner[0].image_1);
      fs.unlinkSync(banner[0].image_2);
      fs.unlinkSync(banner[0].image_3);
    } catch (err) {
      console.log(err);
    }
    await Banner.deleteMany({});
    new Banner({
      video: req.files[0].path,
      image_1: req.files[1].path,
      image_2: req.files[2].path,
      image_3: req.files[3].path,
    })
      .save()
      .then((p) => {
        res.status(200).send(p);
      })
      .catch((e) => {
        res.send({ e });
      });
  }
});

app.get("/", async (req, res) => {
  console.log(process.env.S3_ACCESS_KEY);
  Banner.find()
    .exec()
    .then((p) => {
      res.status(200).send(p);
    })
    .catch((e) => {
      res.send({ e });
    });
});

module.exports = app;

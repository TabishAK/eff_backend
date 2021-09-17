const Banner = require("../models/bannersModel");
const express = require("express");
const app = express.Router();
const multer = require("multer");
const fs = require("fs");
const { uploadFile } = require("../services/s3");
const upload = multer({ dest: "uploads/" });

app.post("/addVideo", upload.single("video"), async (req, res) => {
  const banner = await Banner.findOne();
  const folder1 = "banners/video/";
  const file = req.file;

  if (!banner) {
    const result1 = await uploadFile(file, folder1, "video/mp4");
    fs.unlinkSync(file.path);
    new Banner({
      video: result1.Location,
    })
      .save()
      .then((p) => {
        res.status(200).send(p);
      })
      .catch((e) => {
        res.send({ e });
      });
  } else if (banner) {
    const result2 = await uploadFile(file, folder1, "video/mp4");
    fs.unlinkSync(file.path);
    banner.video = result2.Location;
    banner
      .save()
      .then((p) => {
        res.status(200).send(p);
      })
      .catch((e) => {
        res.send({ e });
      });
  }
});

app.delete("/deleteVideo", async (req, res) => {
  const banner = await Banner.findOne();
  if (banner) {
    banner.video = "";
    banner
      .save()
      .then((p) => {
        res.status(200).send(p);
      })
      .catch((e) => {
        res.send({ e });
      });
  }
});

app.post("/add_image_1", upload.single("image_1"), async (req, res) => {
  const banner = await Banner.findOne();
  const folder1 = "banners/images/";
  const file = req.file;

  if (!banner) {
    const result1 = await uploadFile(file, folder1, "image/jpeg");
    fs.unlinkSync(file.path);

    new Banner({
      image_1: result1.Location,
    })
      .save()
      .then((p) => {
        res.status(200).send(p);
      })
      .catch((e) => {
        res.send({ e });
      });
  } else if (banner) {
    const result2 = await uploadFile(file, folder1, "image/jpeg");
    fs.unlinkSync(file.path);

    banner.image_1 = result2.Location;
    banner
      .save()
      .then((p) => {
        res.status(200).send(p);
      })
      .catch((e) => {
        res.send({ e });
      });
  }
});

app.delete("/delete_image_1", async (req, res) => {
  const banner = await Banner.findOne();
  if (banner) {
    banner.image_1 = "";
    banner
      .save()
      .then((p) => {
        res.status(200).send(p);
      })
      .catch((e) => {
        res.send({ e });
      });
  }
});

app.post("/add_image_2", upload.single("image_2"), async (req, res) => {
  const banner = await Banner.findOne();
  const folder1 = "banners/images/";
  const file = req.file;

  if (!banner) {
    const result1 = await uploadFile(file, folder1, "image/jpeg");
    fs.unlinkSync(file.path);

    new Banner({
      image_2: result1.Location,
    })
      .save()
      .then((p) => {
        res.status(200).send(p);
      })
      .catch((e) => {
        res.send({ e });
      });
  } else if (banner) {
    const result2 = await uploadFile(file, folder1, "image/jpeg");
    fs.unlinkSync(file.path);

    banner.image_2 = result2.Location;
    banner
      .save()
      .then((p) => {
        res.status(200).send(p);
      })
      .catch((e) => {
        res.send({ e });
      });
  }
});

app.delete("/delete_image_2", async (req, res) => {
  const banner = await Banner.findOne();
  if (banner) {
    banner.image_2 = "";
    banner
      .save()
      .then((p) => {
        res.status(200).send(p);
      })
      .catch((e) => {
        res.send({ e });
      });
  }
});

app.post("/add_image_3", upload.single("image_3"), async (req, res) => {
  const banner = await Banner.findOne();
  const folder1 = "banners/images/";
  const file = req.file;

  if (!banner) {
    const result1 = await uploadFile(file, folder1, "image/jpeg");
    fs.unlinkSync(file.path);

    new Banner({
      image_3: result1.Location,
    })
      .save()
      .then((p) => {
        res.status(200).send(p);
      })
      .catch((e) => {
        res.send({ e });
      });
  } else if (banner) {
    const result2 = await uploadFile(file, folder1, "image/jpeg");
    fs.unlinkSync(file.path);

    banner.image_3 = result2.Location;
    banner
      .save()
      .then((p) => {
        res.status(200).send(p);
      })
      .catch((e) => {
        res.send({ e });
      });
  }
});

app.delete("/delete_image_3", async (req, res) => {
  const banner = await Banner.findOne();
  if (banner) {
    banner.image_3 = "";
    banner
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

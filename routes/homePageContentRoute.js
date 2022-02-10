const HomePageContent = require("../models/homePageContent");
const express = require("express");
const app = express.Router();
const multer = require("multer");
const fs = require("fs");
const { uploadFile } = require("../services/s3");
const upload = multer({ dest: "uploads/" });

app.get("/", async (req, res) => {
  HomePageContent.findOne()
    .exec()
    .then((p) => {
      res.status(200).send(p);
    })
    .catch((e) => {
      res.send({ e });
    });
});

app.post("/add_image1", upload.single("image_1"), async (req, res) => {
  const homePageContent = await HomePageContent.findOne();
  const folder1 = "Home Page Images/";
  const file = req.file;

  if (!homePageContent) {
    const result1 = await uploadFile(file, folder1, "image/jpeg");
    fs.unlinkSync(file.path);
    new HomePageContent({
      image_1: result1.Location,
    })
      .save()
      .then((p) => {
        res.status(200).send(p);
      })
      .catch((e) => {
        res.send({ e });
      });
  } else if (homePageContent) {
    const result2 = await uploadFile(file, folder1, "image/jpeg");
    fs.unlinkSync(file.path);
    homePageContent.image_1 = result2.Location;
    homePageContent
      .save()
      .then((p) => {
        res.status(200).send(p);
      })
      .catch((e) => {
        res.send({ e });
      });
  }
});

app.delete("/delete_image1", async (req, res) => {
  const homePageContent = await HomePageContent.findOne();
  if (homePageContent) {
    homePageContent.image_1 = "";
    homePageContent
      .save()
      .then((p) => {
        res.status(200).send(p);
      })
      .catch((e) => {
        res.send({ e });
      });
  }
});

app.post("/add_image2", upload.single("image_2"), async (req, res) => {
  const homePageContent = await HomePageContent.findOne();
  const folder1 = "Home Page Images/";
  const file = req.file;

  if (!homePageContent) {
    const result1 = await uploadFile(file, folder1, "image/jpeg");
    fs.unlinkSync(file.path);
    new HomePageContent({
      image_2: result1.Location,
    })
      .save()
      .then((p) => {
        res.status(200).send(p);
      })
      .catch((e) => {
        res.send({ e });
      });
  } else if (homePageContent) {
    const result2 = await uploadFile(file, folder1, "image/jpeg");
    fs.unlinkSync(file.path);
    homePageContent.image_2 = result2.Location;
    homePageContent
      .save()
      .then((p) => {
        res.status(200).send(p);
      })
      .catch((e) => {
        res.send({ e });
      });
  }
});

app.delete("/delete_image2", async (req, res) => {
  const homePageContent = await HomePageContent.findOne();
  if (homePageContent) {
    homePageContent.image_2 = "";
    homePageContent
      .save()
      .then((p) => {
        res.status(200).send(p);
      })
      .catch((e) => {
        res.send({ e });
      });
  }
});

app.post("/add_image3", upload.single("image_3"), async (req, res) => {
  const homePageContent = await HomePageContent.findOne();
  const folder1 = "Home Page Images/";
  const file = req.file;

  if (!homePageContent) {
    const result1 = await uploadFile(file, folder1, "image/jpeg");
    fs.unlinkSync(file.path);
    new HomePageContent({
      image_3: result1.Location,
    })
      .save()
      .then((p) => {
        res.status(200).send(p);
      })
      .catch((e) => {
        res.send({ e });
      });
  } else if (homePageContent) {
    const result2 = await uploadFile(file, folder1, "image/jpeg");
    fs.unlinkSync(file.path);
    homePageContent.image_3 = result2.Location;
    homePageContent
      .save()
      .then((p) => {
        res.status(200).send(p);
      })
      .catch((e) => {
        res.send({ e });
      });
  }
});

app.delete("/delete_image3", async (req, res) => {
  const homePageContent = await HomePageContent.findOne();
  if (homePageContent) {
    homePageContent.image_3 = "";
    homePageContent
      .save()
      .then((p) => {
        res.status(200).send(p);
      })
      .catch((e) => {
        res.send({ e });
      });
  }
});

app.post("/add_image4", upload.single("image_4"), async (req, res) => {
  const homePageContent = await HomePageContent.findOne();
  const folder1 = "Home Page Images/";
  const file = req.file;

  if (!homePageContent) {
    const result1 = await uploadFile(file, folder1, "image/jpeg");
    fs.unlinkSync(file.path);
    new HomePageContent({
      image_4: result1.Location,
    })
      .save()
      .then((p) => {
        res.status(200).send(p);
      })
      .catch((e) => {
        res.send({ e });
      });
  } else if (homePageContent) {
    const result2 = await uploadFile(file, folder1, "image/jpeg");
    fs.unlinkSync(file.path);
    homePageContent.image_4 = result2.Location;
    homePageContent
      .save()
      .then((p) => {
        res.status(200).send(p);
      })
      .catch((e) => {
        res.send({ e });
      });
  }
});

app.delete("/delete_image4", async (req, res) => {
  const homePageContent = await HomePageContent.findOne();
  if (homePageContent) {
    homePageContent.image_4 = "";
    homePageContent
      .save()
      .then((p) => {
        res.status(200).send(p);
      })
      .catch((e) => {
        res.send({ e });
      });
  }
});

app.post("/add_para_below_logo", async (req, res) => {
  const homePageContent = await HomePageContent.findOne();

  if (!homePageContent) {
    new HomePageContent({
      para_below_logo: req.body.para_below_logo,
    })
      .save()
      .then((p) => {
        res.status(200).send(p);
      })
      .catch((e) => {
        res.send({ e });
      });
  } else if (homePageContent) {
    homePageContent.para_below_logo = req.body.para_below_logo;
    homePageContent
      .save()
      .then((p) => {
        res.status(200).send(p);
      })
      .catch((e) => {
        res.send({ e });
      });
  }
});

app.delete("/delete_para_below_logo", async (req, res) => {
  const homePageContent = await HomePageContent.findOne();
  if (homePageContent) {
    homePageContent.para_below_logo = "";
    homePageContent
      .save()
      .then((p) => {
        res.status(200).send(p);
      })
      .catch((e) => {
        res.send({ e });
      });
  }
});

module.exports = app;

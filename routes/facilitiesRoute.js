const FaciltitiesModel = require("../models/faciltitiesModel");
const express = require("express");
const app = express.Router();

app.get("/", async (req, res) => {
  FaciltitiesModel.findOne()
    .exec()
    .then((p) => {
      res.status(200).send(p);
    })
    .catch((e) => {
      res.send({ e });
    });
});

app.post("/add_main_heading", async (req, res) => {
  const facilities = await FaciltitiesModel.findOne();

  if (!facilities) {
    new FaciltitiesModel({
      mainHeading: req.body.mainHeading,
    })
      .save()
      .then((p) => {
        res.status(200).send(p);
      })
      .catch((e) => {
        res.send({ e });
      });
  } else if (facilities) {
    facilities.mainHeading = req.body.mainHeading;
    facilities
      .save()
      .then((p) => {
        res.status(200).send(p);
      })
      .catch((e) => {
        res.send({ e });
      });
  }
});

app.post("/add_who_are_we", async (req, res) => {
  const facilities = await FaciltitiesModel.findOne();

  if (!facilities) {
    new FaciltitiesModel({
      whoAreWe: req.body.whoAreWe,
    })
      .save()
      .then((p) => {
        res.status(200).send(p);
      })
      .catch((e) => {
        res.send({ e });
      });
  } else if (facilities) {
    facilities.whoAreWe = req.body.whoAreWe;
    facilities
      .save()
      .then((p) => {
        res.status(200).send(p);
      })
      .catch((e) => {
        res.send({ e });
      });
  }
});

app.post("/add_features", async (req, res) => {
  const facilities = await FaciltitiesModel.findOne();

  if (!facilities) {
    let array = [];
    array.push(req.body);

    new FaciltitiesModel({
      features: array,
    })
      .save()
      .then((p) => {
        res.status(200).send(p);
      })
      .catch((e) => {
        res.send({ e });
      });
  } else if (facilities) {
    facilities.features.push(req.body);
    facilities
      .save()
      .then((p) => {
        res.status(200).send(p);
      })
      .catch((e) => {
        res.send({ e });
      });
  }
});

app.delete("/delete_features", async (req, res) => {
  const facilities = await FaciltitiesModel.findOne();
  if (facilities) {
    const features = facilities.features.id(req.body._id);
    features.remove();
    facilities.save();
    res.status(200).send("Benefit Deleted!");
  } else if (!facilities) {
    res.status(404).send("Data not found. Please Add some");
  }
});

app.post("/add_about_company", async (req, res) => {
  const facilities = await FaciltitiesModel.findOne();

  if (!facilities) {
    let array = [];
    array.push(req.body);

    new FaciltitiesModel({
      about_company: array,
    })
      .save()
      .then((p) => {
        res.status(200).send(p);
      })
      .catch((e) => {
        res.send({ e });
      });
  } else if (facilities) {
    facilities.about_company.push(req.body);
    facilities
      .save()
      .then((p) => {
        res.status(200).send(p);
      })
      .catch((e) => {
        res.send({ e });
      });
  }
});

app.delete("/delete_about_company", async (req, res) => {
  const facilities = await FaciltitiesModel.findOne();
  if (facilities) {
    const features = facilities.about_company.id(req.body._id);
    features.remove();
    facilities.save();
    res.status(200).send("Benefit Deleted!");
  } else if (!facilities) {
    res.status(404).send("Data not found. Please Add some");
  }
});

module.exports = app;

const DistributorModel = require("../models/distributorsModel");
const express = require("express");
const app = express.Router();

app.post("/add", async (req, res) => {
  const { distributor_name, distributor_link } = req.body;

  const distributor = await DistributorModel.findOne({
    distributor_name: distributor_name,
  });

  if (distributor)
    return res.status(400).send("This distributor already exists");

  const model = new DistributorModel({
    distributor_name: distributor_name,
    distributor_link: distributor_link,
  });

  model
    .save()
    .then((c) => {
      res.status(200).json({
        message: "Distributor Created",
        Distributor: model,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

app.get("/", async (req, res) => {
  DistributorModel.find()
    .exec()
    .then((p) => {
      res.status(200).send(p);
    })
    .catch((e) => {
      res.send({ e });
    });
});

app.delete("/delete", async (req, res) => {
  DistributorModel.deleteOne({ _id: req.body._id })
    .then((p) => {
      res.status(200).send(p);
    })
    .catch((e) => {
      res.send({ e });
    });
});

app.put("/update", async (req, res) => {
  const { _id, distributor_name, distributor_link } = req.body;

  const distributor = await DistributorModel.findOne({
    distributor_name: distributor_name,
    distributor_link: distributor_link,
  });

  if (distributor)
    return res.status(400).send("This Distributor Already Exists");

  SubCategoryModel.findByIdAndUpdate(
    { _id: _id },
    {
      $set: {
        distributor_name: distributor_name,
        distributor_link: distributor_link,
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

const CareersModel = require("../models/careersModel");
const express = require("express");
const app = express.Router();

app.get("/", async (req, res) => {
  CareersModel.findOne()
    .exec()
    .then((p) => {
      res.status(200).send(p);
    })
    .catch((e) => {
      res.send({ e });
    });
});

app.post("/addFirstPara", async (req, res) => {
  const careers = await CareersModel.findOne();

  if (!careers) {
    new CareersModel({
      firstPara: req.body.firstPara,
    })
      .save()
      .then((p) => {
        res.status(200).send(p);
      })
      .catch((e) => {
        res.send({ e });
      });
  } else if (careers) {
    careers.firstPara = req.body.firstPara;
    careers
      .save()
      .then((p) => {
        res.status(200).send(p);
      })
      .catch((e) => {
        res.send({ e });
      });
  }
});

app.post("/add_job", async (req, res) => {
  const careers = await CareersModel.findOne();
  if (!careers) {
    let array = [];
    array.push(req.body);

    new CareersModel({
      jobs: array,
    })
      .save()
      .then((p) => {
        res.status(200).send(p);
      })
      .catch((e) => {
        res.send({ e });
      });
  } else if (careers) {
    careers.jobs.push(req.body);
    careers
      .save()
      .then((p) => {
        res.status(200).send(p);
      })
      .catch((e) => {
        res.send({ e });
      });
  }
});

app.post("/addBenefits", async (req, res) => {
  const careers = await CareersModel.findOne();
  if (!careers) {
    let array = [];
    array.push(req.body);

    new CareersModel({
      benefits: array,
    })
      .save()
      .then((p) => {
        res.status(200).send(p);
      })
      .catch((e) => {
        res.send({ e });
      });
  } else if (careers) {
    careers.benefits.push(req.body);
    careers
      .save()
      .then((p) => {
        res.status(200).send(p);
      })
      .catch((e) => {
        res.send({ e });
      });
  }
});

app.delete("/deleteBenefits", async (req, res) => {
  const careers = await CareersModel.findOne();
  if (careers) {
    const benefit = careers.benefits.id(req.body._id);
    benefit.remove();
    careers.save();
    res.status(200).send("Benefit Deleted!");
  } else if (!careers) {
    res.status(404).send("Data not found. Please Add some");
  }
});

app.delete("/deleteJob", async (req, res) => {
  const careers = await CareersModel.findOne();
  if (careers) {
    const jobs = careers.jobs.id(req.body._id);
    jobs.remove();
    careers.save();
    res.status(200).send("Job Deleted!");
  } else if (!careers) {
    res.status(404).send("Data not found. Please Add some");
  }
});

module.exports = app;

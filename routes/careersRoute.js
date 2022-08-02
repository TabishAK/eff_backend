const CareersModel = require("../models/careersModel");
const express = require("express");
const app = express.Router();
const auth = require("../Middlewares/auth");

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

app.post("/addFirstPara", auth, async (req, res) => {
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

app.post("/add_job", auth, async (req, res) => {
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

app.post("/addBenefits", auth, async (req, res) => {
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

app.delete("/deleteBenefits", auth, async (req, res) => {
  const careers = await CareersModel.findOne();
  if (careers) {
    const benefit = careers.benefits.id(req.body._id);
    benefit.remove();
    careers.save();
    res.status(200).send(careers);
  } else if (!careers) {
    res.status(404).send("Data not found. Please Add some");
  }
});

app.delete("/deleteJob", auth, async (req, res) => {
  const careers = await CareersModel.findOne();
  if (careers) {
    const jobs = careers.jobs.id(req.body._id);
    jobs.remove();
    careers.save();
    res.status(200).send({ data: careers, message: "Job Deleted!" });
  } else if (!careers) {
    res.status(404).send("Data not found. Please Add some");
  }
});

module.exports = app;

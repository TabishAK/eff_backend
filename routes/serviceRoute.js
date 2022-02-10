const ServiceModel = require("../models/servicesModel");
const express = require("express");
const app = express.Router();

app.get("/", async (req, res) => {
  ServiceModel.find()
    .exec()
    .then((p) => {
      res.status(200).send(p);
    })
    .catch((e) => {
      res.send({ e });
    });
});

app.get("/byParams", async (req, res) => {
  ServiceModel.findOne({ slug: req.query.slug })
    .exec()
    .then((p) => {
      res.status(200).send(p);
    })
    .catch((e) => {
      res.send({ e });
    });
});

app.post("/add-capabilities", async (req, res) => {
  const service = await ServiceModel.findOne({ _id: req.body._id });
  service.capabilities = req.body.capabilities;
  service
    .save()
    .then((p) => {
      res.status(200).send(p);
    })
    .catch((e) => {
      res.send({ e });
    });
});

app.post("/add-main-paragraph", async (req, res) => {
  const service = await ServiceModel.findOne({ _id: req.body._id });
  service.mainParagraph = req.body.mainParagraph;
  service
    .save()
    .then((p) => {
      res.status(200).send(p);
    })
    .catch((e) => {
      res.send({ e });
    });
});

app.post("/add_slug", async (req, res) => {
  new ServiceModel({
    slug: req.body.slug,
  })
    .save()
    .then((p) => {
      res.status(200).send(p);
    })
    .catch((e) => {
      res.send({ e });
    });
});

app.post("/add-services", async (req, res) => {
  const service = await ServiceModel.findOne({ _id: req.body._id });

  service.services.push(req.body.service);
  service
    .save()
    .then((p) => {
      res.status(200).send(p);
    })
    .catch((e) => {
      res.send({ e });
    });
});

app.delete("/delete_service", async (req, res) => {
  const s = await ServiceModel.findOne({ _id: req.body.main_id });
  if (s) {
    const serv = s.services.id(req.body._id);
    serv.remove();
    s.save();
    res.status(200).send("Benefit Deleted!");
  } else if (!s) {
    res.status(404).send("Data not found. Please Add some");
  }
});

app.post("/add-process", async (req, res) => {
  const service = await ServiceModel.findOne({ _id: req.body._id });

  service.process.push(req.body.process);
  service
    .save()
    .then((p) => {
      res.status(200).send(p);
    })
    .catch((e) => {
      res.send({ e });
    });
});

app.delete("/delete_process", async (req, res) => {
  const proc = await ServiceModel.findOne({ _id: req.body.main_id });
  if (proc) {
    const serv = proc.process.id(req.body._id);
    serv.remove();
    proc.save();
    res.status(200).send("Process Deleted!");
  } else if (!s) {
    res.status(404).send("Data not found. Please Add some");
  }
});

module.exports = app;

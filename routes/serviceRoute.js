const ServiceModel = require("../models/servicesModel");
const express = require("express");
const app = express.Router();
const auth = require("../Middlewares/auth");

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

app.post("/add-capabilities", auth, async (req, res) => {
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

app.post("/add-new-service", auth, async (req, res) => {
  const service = await ServiceModel.findOne({
    main_service_name: req.body.main_service_name,
  });

  if (service) {
    res.status(400).send("Service with this name already exists.");
  }

  const temp = new ServiceModel({
    main_service_name: req.body.main_service_name,
    mainParagraph: req.body.mainParagraph,
  });

  try {
    const result = await temp.save();
    res.status(200).send(result);
  } catch (e) {
    res.status(400).send("New Service Could not be stored");
  }
});

app.post("/add-main-paragraph", auth, async (req, res) => {
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

app.post("/add-slug", auth, async (req, res) => {
  const service = await ServiceModel.findOne({ _id: req.body._id });
  service.slug = req.body.slug;
  service
    .save()
    .then((p) => {
      res.status(200).send(p);
    })
    .catch((e) => {
      res.send({ e });
    });
});

app.post("/add-services", auth, async (req, res) => {
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

app.delete("/delete_service", auth, async (req, res) => {
  console.log(req.body);
  const s = await ServiceModel.findOne({ _id: req.body.main_id });
  if (s) {
    const serv = s.services.id(req.body._id);
    serv?.remove();
    s.save();
    res.status(200).send("Benefit Deleted!");
  } else if (!s) {
    res.status(404).send("Data not found. Please Add some");
  }
});

app.post("/add-process", auth, async (req, res) => {
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

app.delete("/delete_process", auth, async (req, res) => {
  const proc = await ServiceModel.findOne({ _id: req.body.main_id });
  if (proc) {
    const serv = proc.process.id(req.body._id);
    serv.remove();
    proc.save();
    res.status(200).send("Process Deleted!");
  } else if (!proc) {
    res.status(404).send("Data not found. Please Add some");
  }
});

app.delete("/delete_main_service", auth, async (req, res) => {
  console.log(req.body);
  const proc = await ServiceModel.deleteOne({ _id: req.body._id });
  try {
    proc.save();
    res.status(200).send("Main Service Deleted!");
  } catch (e) {
    res.status(200).send(e);
  }
});

module.exports = app;

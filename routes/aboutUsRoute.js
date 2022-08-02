const AboutUsModel = require("../models/aboutUsModel");
const express = require("express");
const app = express.Router();
const auth = require("../Middlewares/auth");

app.get("/", async (req, res) => {
  AboutUsModel.findOne()
    .exec()
    .then((p) => {
      res.status(200).send(p);
    })
    .catch((e) => {
      res.send({ e });
    });
});

app.post("/add-para-1", auth, async (req, res) => {
  const about = await AboutUsModel.findOne();

  if (!about) {
    new AboutUsModel({
      para1: req.body.para1,
    })
      .save()
      .then((p) => {
        res.status(200).send(p);
      })
      .catch((e) => {
        res.send({ e });
      });
  } else if (about) {
    about.para1 = req.body.para1;
    about
      .save()
      .then((p) => {
        res.status(200).send(p);
      })
      .catch((e) => {
        res.send({ e });
      });
  }
});

app.post("/delete-para-1", auth, async (req, res) => {
  const about = await AboutUsModel.findOne();
  if (about) {
    about.para1 = "";
    about
      .save()
      .then((p) => {
        res.status(200).send(p);
      })
      .catch((e) => {
        res.send({ e });
      });
  } else {
    res.status(404).send("Data isnt Availabe. Add First!");
  }
});

app.post("/add-para-2", auth, async (req, res) => {
  const about = await AboutUsModel.findOne();

  if (!about) {
    new AboutUsModel({
      para2: req.body.para2,
    })
      .save()
      .then((p) => {
        res.status(200).send(p);
      })
      .catch((e) => {
        res.send({ e });
      });
  } else if (about) {
    about.para2 = req.body.para2;
    about
      .save()
      .then((p) => {
        res.status(200).send(p);
      })
      .catch((e) => {
        res.send({ e });
      });
  }
});

app.post("/delete-para-2", auth, async (req, res) => {
  const about = await AboutUsModel.findOne();
  if (about) {
    about.para2 = "";
    about
      .save()
      .then((p) => {
        res.status(200).send(p);
      })
      .catch((e) => {
        res.send({ e });
      });
  } else {
    res.status(404).send("Data isnt Availabe. Add First!");
  }
});

app.post("/add-para-3", auth, async (req, res) => {
  const about = await AboutUsModel.findOne();

  if (!about) {
    new AboutUsModel({
      para3: req.body.para3,
    })
      .save()
      .then((p) => {
        res.status(200).send(p);
      })
      .catch((e) => {
        res.send({ e });
      });
  } else if (about) {
    about.para3 = req.body.para3;
    about
      .save()
      .then((p) => {
        res.status(200).send(p);
      })
      .catch((e) => {
        res.send({ e });
      });
  }
});

app.post("/delete-para-3", auth, async (req, res) => {
  const about = await AboutUsModel.findOne();
  if (about) {
    about.para3 = "";
    about
      .save()
      .then((p) => {
        res.status(200).send(p);
      })
      .catch((e) => {
        res.send({ e });
      });
  } else {
    res.status(404).send("Data isnt Availabe. Add First!");
  }
});

app.post("/add-para-4", auth, async (req, res) => {
  const about = await AboutUsModel.findOne();

  if (!about) {
    new AboutUsModel({
      para4: req.body.para4,
    })
      .save()
      .then((p) => {
        res.status(200).send(p);
      })
      .catch((e) => {
        res.send({ e });
      });
  } else if (about) {
    about.para4 = req.body.para4;
    about
      .save()
      .then((p) => {
        res.status(200).send(p);
      })
      .catch((e) => {
        res.send({ e });
      });
  }
});

app.post("/delete-para-4", auth, async (req, res) => {
  const about = await AboutUsModel.findOne();
  if (about) {
    about.para4 = "";
    about
      .save()
      .then((p) => {
        res.status(200).send(p);
      })
      .catch((e) => {
        res.send({ e });
      });
  } else {
    res.status(404).send("Data isnt Availabe. Add First!");
  }
});

app.post("/add-para-5", auth, async (req, res) => {
  const about = await AboutUsModel.findOne();

  if (!about) {
    new AboutUsModel({
      para5: req.body.para5,
    })
      .save()
      .then((p) => {
        res.status(200).send(p);
      })
      .catch((e) => {
        res.send({ e });
      });
  } else if (about) {
    about.para5 = req.body.para5;
    about
      .save()
      .then((p) => {
        res.status(200).send(p);
      })
      .catch((e) => {
        res.send({ e });
      });
  }
});

app.post("/delete-para-5", auth, async (req, res) => {
  const about = await AboutUsModel.findOne();
  if (about) {
    about.para5 = "";
    about
      .save()
      .then((p) => {
        res.status(200).send(p);
      })
      .catch((e) => {
        res.send({ e });
      });
  } else {
    res.status(404).send("Data isnt Availabe. Add First!");
  }
});

module.exports = app;

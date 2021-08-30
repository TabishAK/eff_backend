const Banner = require("../models/bannersModel");
const express = require("express");
const app = express.Router();

app.post("/addVideo", async (req, res) => {
  const { video } = req.file.video;
});
app.post("/add_image_1", async (req, res) => {
  const { image_1 } = req.file.image_1;
});
app.post("/add_image_2", async (req, res) => {
  const { image_2 } = req.file.image_2;
});
app.post("/add_image_3", async (req, res) => {
  const { image_3 } = req.file.image_3;
});

module.exports = app;

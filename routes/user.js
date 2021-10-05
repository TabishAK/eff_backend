const UserModel = require("../models/UserModel");
const express = require("express");
const app = express.Router();
const bcrypt = require("bcrypt");
const _ = require("lodash");
const jwt = require("jsonwebtoken");

app.post("/signup", async (req, res) => {
  let user = await UserModel.findOne({ username: req.body.username });
  if (user) return res.status(400).send("User Already Registered");

  let newUser = new UserModel(_.pick(req.body, ["username", "password"]));

  const salt = await bcrypt.genSalt(10);
  newUser.password = await bcrypt.hash(newUser.password, salt);

  try {
    await newUser.save();
    res.send(_.pick(newUser, ["_id", "username"]));
  } catch (err) {
    console.log(err);
  }
});

app.post("/signin", async (req, res) => {
  let user = await UserModel.findOne({ username: req.body.username });
  if (!user) return res.status(400).send("Invalid Email or Password");

  const validPassword = bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid Email or Password");

  const token = jwt.sign(
    { id: user._id, password: user.password },
    "jwtprivatekey"
  );
  res.send(token);
});

module.exports = app;

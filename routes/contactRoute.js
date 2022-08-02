const ContactModel = require("../models/contactModel");
const express = require("express");
const app = express.Router();

var SibApiV3Sdk = require("sib-api-v3-sdk");
var defaultClient = SibApiV3Sdk.ApiClient.instance;
var apiKey = defaultClient.authentications["api-key"];
const auth = require("../Middlewares/auth");

apiKey.apiKey =
  "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";

app.get("/", async (req, res) => {
  ContactModel.findOne()
    .exec()
    .then((p) => {
      res.status(200).send(p);
    })
    .catch((e) => {
      res.send({ e });
    });
});

app.post("/add-contact", auth, async (req, res) => {
  const contact = await ContactModel.findOne();
  if (contact) {
    return res.status(400).send("Contact Already Stored");
  } else {
    try {
      const result = new ContactModel({
        address: req.body.address,
        phone_1: req.body.phone_1,
        phone_2: req.body.phone_2,
        email: req.body.email,
      });

      const temp = await result.save();
      return res.status(200).send({ temp });
    } catch (err) {
      return res.status(400).send(err);
    }
  }
});

app.put("/update-contact", auth, async (req, res) => {
  ContactModel.updateOne({ _id: req.body._id }, req.body, (error) => {
    if (error) {
      res.send({
        message: "Update fail!",
        error,
      });
    } else {
      res.send({
        message: "Successfuly updated !",
      });
    }
  });
});

app.post("/send-message-to-email", async (req, res) => {
  var apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
  var sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail(); // SendSmtpEmail | Values to send a transactional email
  sendSmtpEmail = {
    sender: { email: "contact@take4media.com" },
    to: [
      {
        email: req.body.email,
        name: req.body.name,
      },
    ],

    subject: "Sierra Textiles - Customer Query",
    textContent: req.body.message,
  };

  apiInstance.sendTransacEmail(sendSmtpEmail).then(
    function (data) {
      console.log("Mail API called successfully");
    },
    function (error) {
      return res.status(400).send("Message could not be send to mail.");
    }
  );
});

module.exports = app;

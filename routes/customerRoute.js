const CustomerModel = require("../models/customerModel");
const express = require("express");
const app = express.Router();
const bcrypt = require("bcrypt");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

var SibApiV3Sdk = require("sib-api-v3-sdk");
var cookieParser = require("cookie-parser");
var settTheVar = express();
var defaultClient = SibApiV3Sdk.ApiClient.instance;
var apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey =
  "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";

// sgMail.setApiKey(
//   "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"
// );

app.use(cookieParser());

app.post("/signup", async (req, res) => {
  let customer = await CustomerModel.findOne({
    email: req.body.email,
    isVerified: true,
  });
  if (customer) return res.status(400).send("This Email Already Registered");

  let newCustomer = new CustomerModel({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    contact_no: req.body.contact_no,
    password: req.body.password,
    confirm_password: req.body.confirm_password,
    emailToken: crypto.randomBytes(64).toString("hex"),
    isVerified: false,
  });

  var apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
  var sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail(); // SendSmtpEmail | Values to send a transactional email
  sendSmtpEmail = {
    sender: { email: "contact@take4media.com" },
    to: [
      {
        email: req.body.email,
        name: req.body.first_name,
      },
    ],

    subject: "Sierra Textile - Verify Your Email",
    textContent: `Hello, thanks for registering on our site.
    Please copy and the address below to verify your account.
    http://https://api.sierratextiles.com.pk/customerAuth/verify-email?token=${newCustomer.emailToken}`,

    htmlContent: `<table border="0" cellspacing="0" cellpadding="10" style="font-family:arial; font-size:10pt; width:800px; margin:0 auto">
    <tbody><tr><td>
    <img
      src="https://eff-photos.s3.ap-southeast-1.amazonaws.com/logo/sierra-logo.png" naturalheight="0" naturalwidth="0"
      alt="EFF"
      style="cursor: pointer; max-width: 35%; height: auto; position: relative; left: -55px; margin-bottom: -28px !important;"
      />
      <div style="border-bottom:dotted 1px #444"><br></div></td></tr><tr><td><p style="font-family:arial; font-size:10pt; color:#828282">
    <span style="
    font-size:22px; 
    text-transform: uppercase;
    font-weight: bold;">
    Hello ${newCustomer.first_name}${" "}${newCustomer.last_name}</span><br></p>
    <span style="font-size:24px; font-weight:bold">Sierra Textiles's Website Registration</span><br></p>
    <div class="x_translatedBlock">Thankyou for registering with the Sierra Textiles Website.</div><p></p></td></tr><tr><td>
    <p style="font-size:18px">Please click the link below to verify your account<p>
    <a 
    style="
    font-size: 20px;
    color: #c38e2f;
    text-decoration: none;
    font-weight: bold;"
    clicktracking="off" href="https://api.sierratextiles.com.pk/customerAuth/verify-email?token=${
      newCustomer.emailToken
    }&slugForBroucher=${req.body.slugForBroucher}"> Verify your account </a>
    <br/>
    <div style="border-top:dotted 1px #444">
    <br>
    </div>
    <p style="font-family:arial; font-size:7pt; color:#828282">Confidentiality Notice:<br><br><span class="x_translatedBlock">
    The information in this email is confidential and is intended solely for the addressee.
     If you are not the intended recipient, you must not read, use or disseminate the information contained.
      Any views expressed in this message are those of the individual sender, except where the sender specifically states them to be the views of Sierra Textile Ltd. Sierra Textile Ltd owns the intellectual property rights and copyright of all images and products relating to the Sierra Textile, wallcoverings and trimmings.
     Any unauthorised reproduction or copying of Sierra Textile Ltd products or images may result in legal action. Sierra Textile Ltd is a Limited Company registered in USA. The registered office address is:  Sierra Textiles | 440 Boulder Court, Suite 100, Pleasanton, CA 94566</span>
    </p></td></tr>
    </tbody>
    </table>`,
  };

  apiInstance.sendTransacEmail(sendSmtpEmail).then(
    function (data) {
      console.log("Mail API called successfully");
    },
    function (error) {
      return res
        .status(400)
        .send("Verification Mail could not be send and not signup properly.");
    }
  );

  try {
    const result = await newCustomer.save();
    if (result) {
      return res.status(200).send({
        message:
          "Thanks for registering. Please check your email to veify your account.",
      });
    }
  } catch (err) {
    return res.status(400).send(err, "Something went wrong.");
  }
});

app.get("/verify-email", async (req, res, next) => {
  try {
    const user = await CustomerModel.findOne({ emailToken: req.query.token });
    if (!user) {
      console.log("Token is Invalid.");
      return res.status(400).send("Token is Invalid.");
    }
    user.emailToken = null;
    user.isVerified = true;
    await user.save();

    const token = jwt.sign(
      { id: user._id, first_name: user.first_name, email: user.email },
      "jwtprivatekey"
    );

    settTheVar.set("eff_token", `${token}`);
    return res.redirect(
      `https://www.sierratextiles.com.pk${req.query.slugForBroucher}`
    );
  } catch (err) {
    console.log(err);
  }
});

app.get("/getToken", async (req, res) => {
  if (settTheVar.get("eff_token")) {
    res.status(200).send({ token: settTheVar.get("eff_token") });
    settTheVar.set("eff_token", null);
    return;
  } else {
    return res.status(404).send({ message: "No Token Found" });
  }
});

app.post("/signin", async (req, res) => {
  let customer = await CustomerModel.findOne({ email: req.body.email });
  if (!customer) return res.status(400).send("Invalid Email or Password");

  const validPassword = await bcrypt.compare(
    req.body.password,
    customer.password
  );

  if (!validPassword) return res.status(400).send("Invalid Email or Password");

  if (customer.isVerified === false) {
    return res
      .status(400)
      .send("Your Account is not verified. Please verify your account.");
  }

  const token = jwt.sign(
    { id: customer._id, password: customer.first_name, email: customer.email },
    "eff_jwt_key"
  );
  res.status(200).send(token);
});

module.exports = app;

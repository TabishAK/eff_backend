var express = require("express");
var cors = require("cors");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
const products = require("./routes/products");
const mainCategory = require("./routes/mainCategory");
const subCategories = require("./routes/subCategory");
const swatches = require("./routes/swatches");
const distributor = require("./routes/distributor");
const banner = require("./routes/banner");
const user = require("./routes/user");
const customer = require("./routes/customerRoute");
const applyJob = require("./routes/applyJobRoute");
const aboutUs = require("./routes/aboutUsRoute");
const homePageContent = require("./routes/homePageContentRoute");
const careers = require("./routes/careersRoute");
const facilities = require("./routes/facilitiesRoute");
const services = require("./routes/serviceRoute");
const subscription = require("./routes/subscriptionRoute");
const contact = require("./routes/contactRoute");

mongoose.connect(
  "mongodb+srv://tabish:ichbintabish@effcluster.oca58.mongodb.net/effDatabase?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }
);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.json());
app.use(express.json());

app.use(bodyParser.json({ limit: "500mb" }));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/banner", banner);
app.use("/products", products);
app.use("/swatches", swatches);
app.use("/distributors", distributor);
app.use("/mainCategory", mainCategory);
app.use("/subCategories", subCategories);
app.use("/customerAuth", customer);
app.use("/apply_job", applyJob);
app.use("/homePageContent", homePageContent); //add_para_below_logo
app.use("/aboutUs", aboutUs);
app.use("/careers", careers);
app.use("/auth", user);
app.use("/facilities", facilities);
app.use("/services", services);
app.use("/subscribe", subscription);
app.use("/contact", contact);

app.set("port", process.env.PORT || 8000);
app.listen(app.get("port"), () =>
  console.log("Server is running on port 5000")
);

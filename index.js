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

mongoose.connect(
  "mongodb+srv://tabish:ichbintabish@effcluster.oca58.mongodb.net/effDatabase?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }
);

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(bodyParser.json({ limit: "50mb" }));

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

app.use("/auth", user);

app.set("port", process.env.PORT || 8000);
app.listen(app.get("port"), () =>
  console.log("Server is running on port 8000")
);

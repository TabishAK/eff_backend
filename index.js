var express = require("express");
var cors = require("cors");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var multipart = require("connect-multiparty");
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

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use(cors());

app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);

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

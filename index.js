var express = require("express");
var cors = require("cors");
var app = express();
bodyParser = require("body-parser");
var mongoose = require("mongoose");

const products = require("./routes/products");
const mainCategory = require("./routes/mainCategory");
const subCategories = require("./routes/subCategory");
const swatches = require("./routes/swatches");
const distributor = require("./routes/distributor");
const banner = require("./routes/banner");

mongoose.connect("mongodb://localhost/eff", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());
app.use("/uploads", express.static("./uploads"));
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use("/products", products);
app.use("/swatches", swatches);
app.use("/subCategories", subCategories);
app.use("/mainCategory", mainCategory);
app.use("/distributor", distributor);
app.use("/banner", banner);

app.set("port", process.env.PORT || 8000);
app.listen(app.get("port"), () =>
  console.log("Server is running on port 8000")
);

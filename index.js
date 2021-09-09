var express = require("express");
var cors = require("cors");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var multipart = require("connect-multiparty");
const products = require("./routes/products");
const mainCategory = require("./routes/mainCategory");
const subCategories = require("./routes/subCategory");
const brouchers = require("./routes/broucher");
const distributor = require("./routes/distributor");
const banner = require("./routes/banner");

mongoose.connect(
  "mongodb+srv://tabish:ichbintabish@effcluster.oca58.mongodb.net/effDatabase?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.use(cors());
// app.use("/uploads", express.static("./uploads"));
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use("/banner", banner);
app.use("/products", products);
app.use("/brouchers", brouchers);
app.use("/distributor", distributor);
app.use("/mainCategory", mainCategory);
app.use("/subCategories", subCategories);

app.set("port", process.env.PORT || 8000);
app.listen(app.get("port"), () =>
  console.log("Server is running on port 8000")
);

require("dotenv").config();
const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  console.log(req.headers.auth);
  const token = req.headers.auth;
  if (!token) {
    return res.status(401).send("Access Denied! No Token Provided");
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (ex) {
    return res.status(400).send("Invalid Token!");
  }
}

module.exports = auth;

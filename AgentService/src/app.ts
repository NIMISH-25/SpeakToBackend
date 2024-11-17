require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

import routes from "./routes/index";

const port = process.env.PORT || 8000;

app.use(bodyParser.json());

const dev = "*";

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", dev);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/api", routes);

app.listen(port, () => {
  return console.log(`Express is listening at PORT ${port}`);
});

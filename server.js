const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// create express app
const app = express();
app.use(cors());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// Require routes
require("./app/routes/show.routes.js")(app);
require("./app/routes/news.routes.js")(app);

// Configuring the database
const dbConfig = require("./config/development.config.js");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

// Connecting to the database
mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Successfully connected to the express-mongo-app DB");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to ExpressMongoApp application.",
  });
});

// listen for requests
app.listen(5000, () => {
  console.log("Server is listening on port 5000");
});

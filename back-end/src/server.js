// Require Dependencies

const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");
const mongoose = require("mongoose");

// Load .env Enviroment Variables to process.env
require("mandatoryenv").load(["DB_URL", "PORT", "SECRET"]);

const { PORT, DB_URL } = process.env;

// Instantiate an Express Application
const app = express();

// Configure Express App Instance
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use(cookieParser());
app.use(cors());
app.use(helmet());
app.use("*", cors());

// This middleware adds the json header to every response
app.use("*", (req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  next();
});

// Assign Routes
app.use("/api/", require("./routes/note.route"));

// Handle not valid route
app.use("*", (req, res) => {
  res.status(404).json({ status: false, message: "Endpoint Not Found" });
});

// Database connection
mongoose.Promise = global.Promise;
mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    () => {
      console.log("Database sucessfully connected");
    },
    (error) => {
      console.log("Database could not connected: " + error);
    }
  );

// Open Server on selected Port
app.listen(PORT, () => console.info("Server listening on port ", PORT));

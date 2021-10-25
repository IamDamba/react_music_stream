// ||||||||||||||||||||||||| Dependances |||||||||||||||||||||||||||

const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const dotenv = require("dotenv").config();
const path = require("path");
const contactRoute = require("./back/routes/contactRoute");

const dbURI = process.env.DB_URI;
const port = process.env.PORT || 5000;

// ||||||||||||||||||||||||| MiddleWare |||||||||||||||||||||||||||

app.use(morgan("dev"));
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ||||||||||||||||||||||||| Routes |||||||||||||||||||||||||||
if (process.env.NODE_ENV === "production") {
  app.use(express.static("front/build"));
  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "front/build", "index.html"));
  });
  app.post("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "front/build", "index.html"));
  });
  app.delete("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "front/build", "index.html"));
  });
  app.options("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "front/build", "index.html"));
  });
  app.put("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "front/build", "index.html"));
  });
}

app.use("/api", contactRoute);

// ||||||||||||||||||||||||| Listen |||||||||||||||||||||||||||

mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((res) => {
    app.listen(port, () => {
      console.log(`Listen to port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

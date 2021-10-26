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
const config = require("./back/global/config");

const dbURI = process.env.DB_URI;

// ||||||||||||||||||||||||| MiddleWare |||||||||||||||||||||||||||

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("front/build"));
// }

app.use(morgan("dev"));
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ||||||||||||||||||||||||| Routes |||||||||||||||||||||||||||
// if (process.env.NODE_ENV === "production") {
//   app.get("/*", (req, res) => {
//     res.sendFile(path.join(__dirname, "front/build", "index.html"));
//   });
// }

app.use("/api", contactRoute);

// ||||||||||||||||||||||||| Listen |||||||||||||||||||||||||||

mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((res) => {
    app.listen(config.port, () => {
      console.log(`Listen to port ${config.port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

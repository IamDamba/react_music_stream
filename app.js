// ||||||||||||||||||||||||| Dependances |||||||||||||||||||||||||||

const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const dotenv = require("dotenv").config();
const path = require("path");
const dbURI = process.env.DB_URI;

const authRoute = require("./back/routes/authRoute");
const tracksRoute = require("./back/routes/tracksRoute");
const paymentRoute = require("./back/routes/paymentRoute");
const contactRoute = require("./back/routes/contactRoute");
const memberRoute = require("./back/routes/memberRoute");
const config = require("./back/global/config");

// ||||||||||||||||||||||||| MiddleWare |||||||||||||||||||||||||||

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "front/build")));
}

app.use(morgan("dev"));
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ||||||||||||||||||||||||| Routes |||||||||||||||||||||||||||

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "front/build", "index.html"));
});

app.use("/api", authRoute);
app.use("/api", tracksRoute);
app.use("/api", paymentRoute);
app.use("/api", contactRoute);
app.use("/api", memberRoute);

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

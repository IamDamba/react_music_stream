// ||||||||||||||||||||||||| Variables |||||||||||||||||||||||||||

const dotenv = require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

const authRoute = require("./back/routes/authRoute");
const tracksRoute = require("./back/routes/tracksRoute");
const paymentRoute = require("./back/routes/paymentRoute");

const Tracks = require("./back/models/Tracks");

const dbURI = process.env.DB_URI;
const port = process.env.PORT;

let db = undefined;

// ||||||||||||||||||||||||| MiddleWare |||||||||||||||||||||||||||

app.use(morgan("dev"));
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ||||||||||||||||||||||||| Routes |||||||||||||||||||||||||||

app.use(authRoute);
app.use(tracksRoute);
app.use(paymentRoute);

// ||||||||||||||||||||||||| Listen |||||||||||||||||||||||||||

mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((res) => {
    app.listen(port || 3001, () => {
      console.log(`Listen to port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

db = mongoose.connection;
db.once("open", async () => {
  if ((await Tracks.countDocuments().exec()) > 0) {
    return;
  } else {
    Promise.all([
      Tracks.create({
        id: 1,
        image: "https://i.imgur.com/WPGSZli.jpg",
        title: "Tampa",
        time: "2.56",
        bpm: "112",
        tag: "Cinqo P",
      }),
      Tracks.create({
        id: 2,
        image: "https://i.imgur.com/WPGSZli.jpg",
        title: "Laugh now, Cry Later",
        time: "2.56",
        bpm: "112",
        tag: "Drake",
      }),
      Tracks.create({
        id: 3,
        image: "https://i.imgur.com/WPGSZli.jpg",
        title: "What's Next",
        time: "2.56",
        bpm: "112",
        tag: "Drake",
      }),
      Tracks.create({
        id: 4,
        image: "https://i.imgur.com/WPGSZli.jpg",
        title: "The Bigger Picture",
        time: "2.56",
        bpm: "112",
        tag: "Lil Baby",
      }),
      Tracks.create({
        id: 5,
        image: "https://i.imgur.com/WPGSZli.jpg",
        title: "The Box",
        time: "2.56",
        bpm: "112",
        tag: "Roddy Ricch",
      }),
      Tracks.create({
        id: 6,
        image: "https://i.imgur.com/WPGSZli.jpg",
        title: "Martin & Gina",
        time: "2.56",
        bpm: "112",
        tag: "Polo G",
      }),
      Tracks.create({
        id: 7,
        image: "https://i.imgur.com/WPGSZli.jpg",
        title: "Goosebumps",
        time: "2.56",
        bpm: "112",
        tag: "Travis Scott",
      }),
    ])
      .then((res) => {
        console.log("Tracks Added");
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

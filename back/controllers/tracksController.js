const Tracks = require("../models/Tracks");
const Comments = require("../models/Comments");
const User = require("../models/Users");
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET_TOKEN;

module.exports.all_get = async (req, res) => {
  let track = [];

  await Tracks.find({}, (err, data) => {
    if (err) {
      console.log(err);
      res.status(400).json({ message: err.message });
    } else {
      if (data) {
        console.log(data);
        res.status(200).send(data);
      } else {
        res.status(400).json({ message: "Error 404" });
      }
    }
  }).sort({ id: -1 });
};
module.exports.list_get = async (req, res) => {
  try {
    res.send(res.paginatedResults);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};
module.exports.id_get = async (req, res) => {
  let id = parseInt(req.query.id);

  await Tracks.findOne({ id: id }, (err, data) => {
    if (err) {
      console.log("Error 404: ", err.message);
      res.status(400).json({ message: err.message });
    } else {
      console.log(data);
      res.status(200).json({ result: data });
    }
  });
};
module.exports.comments_post = async (req, res) => {
  const { id } = req.body;
  let comments = await Comments.find({ track_id: id }, (err, data) => {
    if (err) {
      console.log(err);
      res.status(400).json({ message: err });
    } else {
      console.log(data);
      res.status(200).json({ results: data });
    }
  });
};
module.exports.createcomments_post = async (req, res) => {
  const { token, id, message } = req.body;
  let comment = null;

  if (token) {
    jwt.verify(token, secret, async (err, decodedToken) => {
      if (err) {
        console.log("error occured on verify");
        res.locals.user = null;
        res.status(400).json({ message: err });
      } else {
        let user = await User.findById(decodedToken.id);

        comment = {
          track_id: id,
          username: user.username,
          message: message,
        };

        Promise.all([Comments.create(comment)])
          .then((response) => {
            console.log(response);
            res.status(200).json({ message: "Comment Added" });
          })
          .catch((err) => {
            console.log(err);
            res.status(400).json({ message: err });
          });
      }
    });
  } else {
    res.locals.user = null;
    res
      .status(400)
      .json({ message: "Message not sent. Sign In before please." });
  }
};

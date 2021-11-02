// |||||||||||||||||||||||| Variables ||||||||||||||||||||||||||

const Members = require("../models/Members");
const jwt = require("jsonwebtoken");
const User = require("../models/Users");
const Comments = require("../models/Comments");
const Tracks = require("../models/Tracks");
const Newsletters = require("../models/Newsletters");
const secret = process.env.SECRET_TOKEN;
const tokenDuration = 10 * 60 * 60 * 1000;

// |||||||||||||||||||||||| Function ||||||||||||||||||||||||||

const createToken = (id) => {
  return jwt.sign({ id }, secret);
};

// |||||||||||||||||||||||| Routes ||||||||||||||||||||||||||

module.exports.currentMember_post = async (req, res) => {
  const { token } = req.body;
  if (token) {
    jwt.verify(token, secret, async (err, decodedToken) => {
      if (err) {
        console.log("error occured on verify");
        res.locals.member = null;
        res.status(400).json({ member: res.locals.member });
      } else {
        let member = await Members.findById(decodedToken.id);
        res.locals.member = {
          email: member.email,
          username: member.username,
        };
        res.status(200).json({ member: res.locals.member });
      }
    });
  } else {
    res.locals.member = null;
    res.status(400).json({ user: res.locals.member });
  }
};
module.exports.signin_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    const member = await Members.signin(email, password);
    const token = createToken(member._id);
    console.log("Login successfully");
    res.status(200).json({
      message: "Login Successfully",
      token: token,
      tokenDuration: Date.now() + tokenDuration,
    });
  } catch (err) {
    console.log("error");
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};
module.exports.userList_get = async (req, res) => {
  try {
    res.send(res.paginatedResults);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};
module.exports.userdelete_post = async (req, res) => {
  const { email } = req.body;
  try {
    Promise.all([User.findOneAndDelete({ email: email })])
      .then((rep) => {
        res.status(200).json({
          message: "User Deleted Successfully, wait 3 sec for reload.",
        });
      })
      .catch((err) => {
        res.status(400).json({ message: err });
      });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};
module.exports.commentList_get = async (req, res) => {
  try {
    res.send(res.paginatedResults);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};
module.exports.commentdelete_post = async (req, res) => {
  const { _id } = req.body;
  try {
    Promise.all([Comments.findOneAndDelete({ _id: _id })])
      .then((rep) => {
        res.status(200).json({
          message: "Comment Deleted Successfully, wait 3 sec for reload.",
          data: rep,
        });
      })
      .catch((err) => {
        res.status(400).json({ message: err });
      });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};
module.exports.trackList_get = async (req, res) => {
  try {
    res.send(res.paginatedResults);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};
module.exports.trackdelete_post = async (req, res) => {
  const { id } = req.body;
  try {
    Promise.all([Tracks.findOneAndDelete({ id: id })])
      .then((rep) => {
        res.status(200).json({
          message: "Track Deleted Successfully, wait 3 sec for reload.",
          data: rep,
        });
      })
      .catch((err) => {
        res.status(400).json({ message: err });
      });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};
module.exports.trackupdate_post = async (req, res) => {
  const { id, title, image, media, tag, time, bpm } = req.body;
  const filterUpdate = { id: id };
  let queryUpdate = {
    title: title,
    image: image,
    media: media,
    tag: tag,
    time: time,
    bpm: bpm,
  };

  Promise.all([
    Tracks.findOneAndUpdate(filterUpdate, queryUpdate, { new: true }),
  ])
    .then((rep) => {
      console.log(rep);
      res.status(200).json({
        message: "Track Updated Successfully, wait 3 sec for reload.",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ message: err });
    });
};
module.exports.trackadd_post = async (req, res) => {
  const { title, image, media, tag, time, bpm } = req.body;
  const tracks = await Tracks.find();
  let track_id = tracks.length + 1;
  let isIdMatching = false;

  // Create ID
  for (let value in tracks) {
    if (track_id === tracks[value].id) {
      do {
        track_id = track_id + 1;
      } while (track_id === tracks[value].id);
    }
  }

  let track = {
    id: track_id,
    title: title,
    image: image,
    media: media,
    tag: tag,
    time: time,
    bpm: bpm,
  };

  Promise.all([Tracks.create(track)])
    .then((rep) => {
      console.log(rep);
      res
        .status(200)
        .json({ message: "Track Added Successfully, wait 3 sec for reload." });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ message: err });
    });
};
module.exports.newsletterList_get = async (req, res) => {
  try {
    res.send(res.paginatedResults);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};
module.exports.invoiceList_get = async (req, res) => {
  try {
    res.send(res.paginatedResults);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

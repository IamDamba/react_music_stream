// |||||||||||||||||||||||| Variables ||||||||||||||||||||||||||

const Members = require("../models/Members");
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET_TOKEN;
const tokenDuration = 3 * 24 * 60 * 60;

const Users = require("../models/users");
const Tracks = require("../models/Tracks");
const { Logger } = require("mongodb");

// |||||||||||||||||||||||| Function ||||||||||||||||||||||||||

const createToken = (id) => {
  return jwt.sign({ id }, secret, {
    expiresIn: tokenDuration,
  });
};

const createTrack = (req, res) => {};

// |||||||||||||||||||||||| Routes ||||||||||||||||||||||||||

module.exports.currentMember_get = async (req, res) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, secret, async (err, decodedToken) => {
      if (err) {
        console.log("error occured on verify");
        res.locals.member = null;
        res.status(400).json({ isMember: false, member: res.locals.member });
      } else {
        let member = await Members.findById(decodedToken.id);
        res.locals.member = member.email;
        res.status(200).json({ isMember: true, member: res.locals.member });
      }
    });
  } else {
    res.locals.member = null;
    res.status(400).json({ isMember: false, member: res.locals.member });
  }
};
module.exports.signin_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    const member = await member.signin(email, password);
    console.log(member);
    const token = createToken(member._id);
    res.cookie("member_jwt", token, {
      httpOnly: true,
      maxAge: tokenDuration * 1000,
    });
    console.log("Login successfully");
    res.status(200).json({ message: "Login Successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
module.exports.signout_get = async (req, res) => {
  try {
    res.cookie("member_jwt", "", { maxAge: 1 });
    res.status(200).json({ message: "member Signout" });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ message: err.message });
  }
};

module.exports.userList_get = async (req, res) => {
  const token = req.cookies.jwt;
  let userList = [];

  if (token) {
    jwt.verify(token, secret, async (err, decodedToken) => {
      if (err) {
        console.log("error occured on verify");
        res.locals.member = null;
        res.status(400).json({ isMember: false, member: res.locals.member });
      } else {
        Promise.all([
          Users.find({}).then((res) => {
            userList = res;
          }),
        ])
          .then((res) => {
            console.log(res);
            res.status(400).json({ message: "Users Successfully Catches" });
          })
          .catch((err) => {
            console.log(err);
            res.status(400).json({ message: err });
          });
      }
    });
  } else {
    res.locals.member = null;
    res.status(400).json({ isMember: false, member: res.locals.member });
  }
};
module.exports.userId_get = async (req, res) => {
  const id = req.query.id;
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, secret, async (err, decodedToken) => {
      if (err) {
        console.log("error occured on verify");
        res.locals.member = null;
        res.status(400).json({ isMember: false, member: res.locals.member });
      } else {
        const user = await Users.findOne({ id: {id} }).exec();
        res.status(200).json({ message: "User has been founded", data: user })
      }
    });
  } else {
    res.locals.member = null;
    res.status(400).json({ isMember: false, member: res.locals.member });
  }
};

module.exports.createTrack_post = async (req, res) => {
  const { id, image, title, time, bpm, tag } = req.body;
  const token = req.cookies.jwt;
  let track = {};

  if (token) {
    jwt.verify(token, secret, async (err, decodedToken) => {
      if (err) {
        console.log("error occured on verify");
        res.locals.member = null;
        res.status(400).json({ isMember: false, member: res.locals.member });
      } else {
        track = {
          id: id,
          image: image,
          title: title,
          time: time,
          bpm: bpm,
          tag: tag,
        };
        Promise.all([Tracks.create(track)])
          .then((res) => {
            console.log(res);
            res.status(400).json({ message: "Track Added" });
          })
          .catch((err) => {
            console.log(err);
            res.status(400).json({ message: err });
          });
      }
    });
  } else {
    res.locals.member = null;
    res.status(400).json({ isMember: false, member: res.locals.member });
  }
};
module.exports.updateTrack_post = async (req, res) => {
  const { id, image, title, time, bpm, tag } = req.body;
  const token = req.cookies.jwt;
  const filterUpdate = { id: id };
  let queryUpdate = {};

  if (token) {
    jwt.verify(token, secret, async (err, decodedToken) => {
      if (err) {
        console.log("error occured on verify");
        res.locals.member = null;
        res.status(400).json({ isMember: false, member: res.locals.member });
      } else {
        queryUpdate = {
          image: image,
          title: title,
          time: time,
          bpm: bpm,
          tag: tag,
        };
        Promise.all([
          Tracks.findOneAndUpdate(filterUpdate, queryUpdate, { new: true }),
        ])
          .then((res) => {
            console.log(res);
            res.status(400).json({ message: "Track Updated" });
          })
          .catch((err) => {
            console.log(err);
            res.status(400).json({ message: err });
          });
      }
    });
  } else {
    res.locals.member = null;
    res.status(400).json({ isMember: false, member: res.locals.member });
  }
};
module.exports.deleteTrack_get = async (req, res) => {
  const id = req.query.id;
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, secret, async (err, decodedToken) => {
      if (err) {
        console.log("error occured on verify");
        res.locals.member = null;
        res.status(400).json({ isMember: false, member: res.locals.member });
      } else {
        Promise.all([Tracks.deleteOne({ id: id })])
          .then((res) => {
            console.log(res);
            res.status(400).json({ message: "Track Deleted" });
          })
          .catch((err) => {
            console.log(err);
            res.status(400).json({ message: err });
          });
      }
    });
  } else {
    res.locals.member = null;
    res.status(400).json({ isMember: false, member: res.locals.member });
  }
};

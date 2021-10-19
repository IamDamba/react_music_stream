// |||||||||||||||||||||||| Variables ||||||||||||||||||||||||||

const Members = require("../models/Members");
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET_TOKEN;
const tokenDuration = 0 * 24 * 60 * 60;

// |||||||||||||||||||||||| Function ||||||||||||||||||||||||||

const createToken = (id) => {
  return jwt.sign({ id }, secret, {
    expiresIn: tokenDuration,
  });
};

// |||||||||||||||||||||||| Routes ||||||||||||||||||||||||||

module.exports.currentMember_get = async (req, res) => {
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
    res.status(200).json({ message: "Login Successfully", token: token });
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
// module.exports.userId_get = async (req, res) => {
//   const id = req.query.id;
//   const token = req.cookies.jwt;

//   if (token) {
//     jwt.verify(token, secret, async (err, decodedToken) => {
//       if (err) {
//         console.log("error occured on verify");
//         res.locals.member = null;
//         res.status(400).json({ isMember: false, member: res.locals.member });
//       } else {
//         const user = await Users.findOne({ id: { id } }).exec();
//         res.status(200).json({ message: "User has been founded", data: user });
//       }
//     });
//   } else {
//     res.locals.member = null;
//     res.status(400).json({ isMember: false, member: res.locals.member });
//   }
// };
// module.exports.createTrack_post = async (req, res) => {
//   const { id, image, title, time, bpm, tag } = req.body;
//   const token = req.cookies.jwt;
//   let track = {};

//   if (token) {
//     jwt.verify(token, secret, async (err, decodedToken) => {
//       if (err) {
//         console.log("error occured on verify");
//         res.locals.member = null;
//         res.status(400).json({ isMember: false, member: res.locals.member });
//       } else {
//         track = {
//           id: id,
//           image: image,
//           title: title,
//           time: time,
//           bpm: bpm,
//           tag: tag,
//         };
//         Promise.all([Tracks.create(track)])
//           .then((res) => {
//             console.log(res);
//             res.status(400).json({ message: "Track Added" });
//           })
//           .catch((err) => {
//             console.log(err);
//             res.status(400).json({ message: err });
//           });
//       }
//     });
//   } else {
//     res.locals.member = null;
//     res.status(400).json({ isMember: false, member: res.locals.member });
//   }
// };
// module.exports.updateTrack_post = async (req, res) => {
//   const { id, image, title, time, bpm, tag } = req.body;
//   const token = req.cookies.jwt;
//   const filterUpdate = { id: id };
//   let queryUpdate = {};

//   if (token) {
//     jwt.verify(token, secret, async (err, decodedToken) => {
//       if (err) {
//         console.log("error occured on verify");
//         res.locals.member = null;
//         res.status(400).json({ isMember: false, member: res.locals.member });
//       } else {
//         queryUpdate = {
//           image: image,
//           title: title,
//           time: time,
//           bpm: bpm,
//           tag: tag,
//         };
//         Promise.all([
//           Tracks.findOneAndUpdate(filterUpdate, queryUpdate, { new: true }),
//         ])
//           .then((res) => {
//             console.log(res);
//             res.status(400).json({ message: "Track Updated" });
//           })
//           .catch((err) => {
//             console.log(err);
//             res.status(400).json({ message: err });
//           });
//       }
//     });
//   } else {
//     res.locals.member = null;
//     res.status(400).json({ isMember: false, member: res.locals.member });
//   }
// };
// module.exports.deleteTrack_get = async (req, res) => {
//   const id = req.query.id;
//   const token = req.cookies.jwt;

//   if (token) {
//     jwt.verify(token, secret, async (err, decodedToken) => {
//       if (err) {
//         console.log("error occured on verify");
//         res.locals.member = null;
//         res.status(400).json({ isMember: false, member: res.locals.member });
//       } else {
//         Promise.all([Tracks.deleteOne({ id: id })])
//           .then((res) => {
//             console.log(res);
//             res.status(400).json({ message: "Track Deleted" });
//           })
//           .catch((err) => {
//             console.log(err);
//             res.status(400).json({ message: err });
//           });
//       }
//     });
//   } else {
//     res.locals.member = null;
//     res.status(400).json({ isMember: false, member: res.locals.member });
//   }
// };

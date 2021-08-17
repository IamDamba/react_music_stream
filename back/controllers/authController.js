const User = require("../models/Users");
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET_TOKEN;

const tokenDuration = 3 * 24 * 60 * 60;

const createToken = (id) => {
  return jwt.sign({ id }, secret, {
    expiresIn: tokenDuration,
  });
};

module.exports.currentuser_get = async (req, res) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, secret, async (err, decodedToken) => {
      if (err) {
        console.log("error occured on verify");
        res.locals.user = null;
        res.status(400).json({ isUser: false, user: res.locals.user });
      } else {
        let user = await User.findById(decodedToken.id);
        res.locals.user = user.email;
        res.status(200).json({ isUser: true, user: res.locals.user });
      }
    });
  } else {
    res.locals.user = null;
    res.status(400).json({ isUser: false, user: res.locals.user });
  }
};

module.exports.signup_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: tokenDuration * 1000 });
    console.log("User Registered");
    res.status(201).json({ message: "User Registered" });
  } catch (err) {
    const errors = handleError(err);
    console.log({ errors });
    res.status(400).json({ errors });
  }
};

module.exports.signin_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.signin(email, password);
    console.log(user);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: tokenDuration * 1000 });
    console.log("Login successfully");
    res.status(200).json({ message: "Login Successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports.signout_get = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 1 });
    res.status(200).json({ message: "User Signout" });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ message: err.message });
  }
};

module.exports.deleteaccount_get = async (req, res) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, secret, async (err, decodedToken) => {
      if (err) {
        console.log("An error has occured");
        res.locals.user = null;
        res.status(400).json({
          message: "An error occured on verification",
          user: res.locals.user,
        });
      } else {
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;
        await User.deleteOne({ _id: res.locals.user._id });
        res.cookie("jwt", "", { maxAge: 1 });
        res.status(200).json({ message: "User Successfully Deleted" });
      }
    });
  } else {
    res.locals.user = null;
    res
      .status(400)
      .json({ message: "Token doesn't exist", user: res.locals.user });
  }
};

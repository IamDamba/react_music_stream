// Dependencies

const User = require("../models/Users");
const Invoices = require("../models/Invoices");
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET_TOKEN;
const home_url = process.env.PORT || 3000;
const tokenDuration = 1 * 24 * 60 * 60 * 1000;
const createToken = (id) => {
  return jwt.sign({ id }, secret, {
    expiresIn: tokenDuration,
  });
};

// Router

module.exports.currentuser_post = async (req, res) => {
  const { token, tokenDuration } = req.body;

  if (tokenDuration < Date.now()) {
    res.locals.user = null;
    res.status(200).json({ isUser: false });
  } else {
    if (token) {
      jwt.verify(token, secret, async (err, decodedToken) => {
        if (err) {
          console.log("error occured on verify");
          res.locals.user = null;
          res.status(400).json({ isUser: false, user: res.locals.user });
        } else {
          let user = await User.findById(decodedToken.id);
          res.locals.user = {
            email: user.email,
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            address: user.address,
            country: user.country,
          };
          res.status(200).json({ isUser: true, user: res.locals.user });
        }
      });
    } else {
      res.locals.user = null;
      res.status(400).json({ isUser: false, user: res.locals.user });
    }
  }
};
module.exports.verifypassword_post = async (req, res) => {
  const { token, password } = req.body;
  if (token) {
    jwt.verify(token, secret, async (err, decodedToken) => {
      if (err) {
        console.log("error occured on verify");
        res.locals.user = null;
        res.status(400).json({ isUser: false, user: res.locals.user });
      } else {
        let user = await User.findById(decodedToken.id);
        res.locals.user = {
          password: user.password,
        };
        console.log(res.locals.user.password, password);
        let isPasswordMatch = await User.verifyPassword(
          res.locals.user.password,
          password
        );

        if (!isPasswordMatch) {
          res.status(400).json({
            isUser: true,
            isValid: isPasswordMatch,
            message: "Password don't match",
          });
        }
        res.status(200).json({
          isUser: true,
          isValid: isPasswordMatch,
          message: "Verify Successfully",
        });
      }
    });
  } else {
    res.locals.user = null;
    res.status(400).json({ isUser: false, user: res.locals.user });
  }
};
module.exports.userupdate_put = async (req, res) => {
  const { token, username, email } = req.body;
  if (token) {
    jwt.verify(token, secret, async (err, decodedToken) => {
      if (err) {
        console.log("error occured on verify");
        res.locals.user = null;
        res.status(400).json({ isUser: false, user: res.locals.user });
      } else {
        let query = {
          username: username,
          email: email,
        };
        let user = await User.findByIdAndUpdate(decodedToken.id, query);
        res
          .status(200)
          .json({ isUser: true, message: "Update Successfully !" });
      }
    });
  } else {
    res.locals.user = null;
    res.status(400).json({ isUser: false, user: res.locals.user });
  }
};
module.exports.updatepassword_put = async (req, res) => {
  const { token, password } = req.body;
  if (token) {
    jwt.verify(token, secret, async (err, decodedToken) => {
      if (err) {
        console.log("error occured on verify");
        res.locals.user = null;
        res.status(400).json({ isUser: false, user: res.locals.user });
      } else {
        let newPass = await User.hashNewPassword(password);
        let query = {
          password: newPass,
        };
        let user = await User.findByIdAndUpdate(decodedToken.id, query);
        res.status(200).json({
          isUser: true,
          message: "Update Successfully !",
          password: user,
        });
      }
    });
  } else {
    res.locals.user = null;
    res.status(400).json({ isUser: false, user: res.locals.user });
  }
};
module.exports.signup_post = async (req, res) => {
  const { email, password, username } = req.body;

  try {
    const user = await User.create({ email, password, username });
    const token = createToken(user._id);
    console.log("Login successfully");
    res.status(200).json({
      message: "Signup Successfully",
      token: token,
      tokenDuration: Date.now() + tokenDuration,
    });
  } catch (err) {
    console.log({ err });
    res.status(400).json({ err });
  }
};
module.exports.signin_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.signin(email, password);
    const token = createToken(user._id);
    console.log("Login successfully");
    res.status(200).json({
      message: "Login Successfully",
      token: token,
      tokenDuration: Date.now() + tokenDuration,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
module.exports.deleteaccount_post = async (req, res) => {
  const { token } = req.body;

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
module.exports.userorders_post = async (req, res) => {
  const { token } = req.body;
  let _orders = [];

  if (token) {
    jwt.verify(token, secret, async (err, decodedToken) => {
      if (err) {
        console.log("error occured on verify");
        res.locals.user = null;
        res.status(400).json({ isUser: false, user: res.locals.user });
      } else {
        let user = await User.findById(decodedToken.id);
        await Invoices.find({ user_id: user._id }, (err, docs) => {
          if (err) {
            console.log("error occured on orders fetching");
            res
              .status(400)
              .json({ message: "error occured on orders fetching" });
          } else {
            _orders = docs;
            res.status(200).json({ results: _orders });
          }
        });
      }
    });
  } else {
    res.locals.user = null;
    res.status(400).json({ isUser: false, user: res.locals.user });
  }
};
module.exports.forgottenpassword_post = async (req, res) => {
  const { email } = req.body;

  await User.find({ email: email }, (err, data) => {
    if (err) {
      console.log(err);
      res.status(400).json({ message: "Error occured." });
    } else {
      if (data.length > 0) {
        res.status(200).json({
          message: "Email has been send.",
          link: home_url + `/${data[0].email}/resetpassword`,
        });
      } else {
        res.status(400).json({ message: "Error occured." });
      }
    }
  });
};
module.exports.resetpassword_post = async (req, res) => {
  const { email, password } = req.body;
  const newPass = await User.hashNewPassword(password);
  console.log(newPass);
  await User.findOneAndUpdate(
    { email: email },
    { password: newPass },
    (err, data) => {
      if (err) {
        console.log(err);
        res.status(400).json({ message: "Error Occured." });
      } else {
        res.status(200).json({
          message: "Password has been changed. Wait 3 sec for redirection",
        });
      }
    }
  );
};

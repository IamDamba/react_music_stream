const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    require: [true, "Please enter an email."],
    unique: true,
    lowercase: true,
    validate: [isEmail, "Please enter a valid email."],
  },
  password: {
    type: String,
    require: [true, "Please enter a password."],
    minlength: [6, "Minimum password length is 6 characters"],
  },
  username: {
    type: String,
    unique: true,
    require: [true, "Please enter a username."],
    minlength: [3, "Minimum password length is 3 characters"],
  },
});

UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.statics.signin = async function (email, password) {
  const user = await this.findOne({ email });

  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("Incorrect Password");
  }
  throw Error("Incorrect Email");
};

UserSchema.statics.verifyPassword = async function (bddPassword, password) {
  const verify = await bcrypt.compare(password, bddPassword);
  if (verify) {
    return true;
  }
  return false;
};

UserSchema.statics.hashNewPassword = async function (password) {
  const salt = await bcrypt.genSalt();
  const newPassword = await bcrypt.hash(password, salt);
  return newPassword;
};

const User = mongoose.model("users", UserSchema);

module.exports = User;

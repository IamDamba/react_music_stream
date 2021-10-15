// |||||||||||||||||||||||| Dependences ||||||||||||||||||||||||||

const nodemailer = require("nodemailer");
const Newsletters = require("../models/Newsletters");

// |||||||||||||||||||||||| Functions ||||||||||||||||||||||||||

module.exports.contactform_post = async (req, res) => {
  const { name, email, message } = req.body;
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: "587",
    auth: {
      user: "hortense.cummings65@ethereal.email",
      pass: "Wc8PQ7svBURP6c26WZ",
    },
  });
  const mailOptions = {
    from: `Contact Message - ${email}`,
    to: "hortense.cummings65@ethereal.email",
    subject: `Message send by ${name}`,
    text: message,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("Error occured:" + error);
      res.status(400).json({ message: "Error occured: " });
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).json({ message: "Form has successfully been sent." });
    }
  });
};
module.exports.newsletter_post = async (req, res) => {
  const { email } = req.body;
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: "587",
    auth: {
      user: "hortense.cummings65@ethereal.email",
      pass: "Wc8PQ7svBURP6c26WZ",
    },
  });

  const news_list = await Newsletters.find();

  await Newsletters.find({ email: email }, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      if (result.length < 1) {
        Promise.all([
          Newsletters.create({
            id: news_list.length + 1,
            email: email,
          }),
        ])
          .then((response) => {
            const mailOptions = {
              from: "Music Stream Team - hortense.cummings65@ethereal.email",
              to: email,
              subject: "Newsletter registration",
              html: `<p>Thanks you for your registration to our newsletter !!</p> <p>if you want to quit our service, just click on the link down below</p><a href="http:localhost:3001/api/unsubscribe?email=${email}">Unsubscribe here</a>`,
            };
            transporter.sendMail(mailOptions, function (error, info) {
              if (error) {
                console.log("Error occured:" + error);
                res.status(400).json({ message: "Error occured: " });
              } else {
                console.log("Email sent: " + info.response);
                res
                  .status(200)
                  .json({ message: "Newsletter registration successfully !" });
              }
            });
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        console.log("Error occured: email already in newsletter");
        res
          .status(400)
          .json({ message: "Error occured: email already in newsletter" });
      }
    }
  });
};
module.exports.unsubscribe_delete = async (req, res) => {
  const { email } = req.query;
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: "587",
    auth: {
      user: "hortense.cummings65@ethereal.email",
      pass: "Wc8PQ7svBURP6c26WZ",
    },
  });

  console.log(email);

  const news_list = await Newsletters.findOneAndDelete(
    { email: email },
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(400).send("Error Occured: you already are unsubscribed");
      } else {
        console.log(result);
        res.status(200).json({ message: "Unsubscribed successfully" });
      }
    }
  );
};

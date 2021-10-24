// |||||||||||||||||||||||| Dependences ||||||||||||||||||||||||||

const nodemailer = require("nodemailer");
const Newsletters = require("../models/Newsletters");
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// |||||||||||||||||||||||| Functions ||||||||||||||||||||||||||

module.exports.contactform_post = async (req, res) => {
  const { name, email, message } = req.body;
  const mailOptions = {
    from: `Contact Message`,
    to: process.env.EMAIL_USER,
    subject: `Message send by ${name} <${email}>`,
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
              from: `Music Stream Team - ${process.env.EMAIL_USER}`,
              to: email,
              subject: "Newsletter registration",
              html: `<p>Thanks you for your registration to our newsletter !!</p> <p>if you want to quit our service, just click on the link down below</p><a href="${process.env.PORT}/api/unsubscribe?email=${email}">Unsubscribe here</a>`,
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
module.exports.unsubscribe_get = async (req, res) => {
  const { email } = req.query;

  console.log(email);

  const news_list = await Newsletters.findOneAndDelete(
    { email: email },
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(400).sent("Error occured: data was not found");
      } else {
        if (result !== null) {
          res
            .status(200)
            .redirect(`${process.env.PORT}/newsletter/unsubscribe/success`);
        } else {
          res
            .status(200)
            .redirect(`${process.env.PORT}/newsletter/unsubscribe/cancel`);
        }
      }
    }
  );
};

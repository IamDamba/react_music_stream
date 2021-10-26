// |||||||||||||||||||||||| Dependences ||||||||||||||||||||||||||

const nodemailer = require("nodemailer");
const Newsletters = require("../models/Newsletters");
const {
  ContactMailSender,
  NewsletterMailSender,
} = require("../data/mail/sendMail");
const config = require("../global/config");
const home_url = config.base_url;

// |||||||||||||||||||||||| Functions ||||||||||||||||||||||||||

module.exports.contactform_post = async (req, res) => {
  const { name, email, message } = req.body;

  ContactMailSender(name, email, message)
    .then((rep) => {
      console.log("Email sent: ", rep);
      res.status(200).json({ message: "Email Sent Successfully !" });
    })
    .catch((err) => {
      console.log("Error occurerd: ", err);
      res.status(400).json({ message: "Error Occured: Email Not Sent" });
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
            const htmlMessage = () => {
              return `<p>Thanks you for your registration to our newsletter !!</p>
              <br>
              <br>
              <p>If you want to quit our service, just click on the link down below</p>
              <a href="${home_url}/api/unsubscribe?email=${email}">Unsubscribe here</a>`;
            };
            NewsletterMailSender(email, htmlMessage())
              .then((rep) => {
                console.log("Email sent: ", rep);
                res.status(200).json({ message: "Email Sent Successfully !" });
              })
              .catch((err) => {
                console.log("Error occurerd: ", err);
                res
                  .status(400)
                  .json({ message: "Error Occured: Email Not Sent" });
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
            .redirect(`${home_url}/newsletter/unsubscribe/success`);
        } else {
          res.status(200).redirect(`${home_url}/newsletter/unsubscribe/cancel`);
        }
      }
    }
  );
};

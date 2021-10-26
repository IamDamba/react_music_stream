const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const config = require("../google/config");
const OAuth2 = google.auth.OAuth2;

const OAuth2_client = new OAuth2(config.clientId, config.clientSecret);
OAuth2_client.setCredentials({ refresh_token: config.refreshToken });

const contactMailSender = (name, recipient, message) => {
  try {
    //Value
    const accessToken = OAuth2_client.getAccessToken();

    //Functions
    const getHtmlMessage = () => {
      return `<b>${message}</b>`;
    };
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: config.user_email,
        clientId: config.clientId,
        clientSecret: config.clientSecret,
        refreshToken: config.refreshToken,
        accessToken: accessToken,
      },
    });
    const mail_option = {
      from: `Music Stream Service`,
      to: `${config.user_email}`,
      subject: `Message from Contact by ${name} <${recipient}>`,
      html: getHtmlMessage(),
    };
    const result = transport.sendMail(mail_option);
    return result;
  } catch (err) {
    return err;
  }
};
const newsletterMailSender = (recipient, message) => {
  try {
    //Value
    const accessToken = OAuth2_client.getAccessToken();

    //Functions
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: config.user_email,
        clientId: config.clientId,
        clientSecret: config.clientSecret,
        refreshToken: config.refreshToken,
        accessToken: accessToken,
      },
    });
    const mail_option = {
      from: `Music Stream Service`,
      to: `${recipient}`,
      subject: `Newsletter Message`,
      html: message,
    };
    const result = transport.sendMail(mail_option);
    return result;
  } catch (err) {
    return err;
  }
};

module.exports = {
  ContactMailSender: contactMailSender,
  NewsletterMailSender: newsletterMailSender,
};

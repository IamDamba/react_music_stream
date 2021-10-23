// |||||||||||||||||||||||| Variables ||||||||||||||||||||||||||

const User = require("../models/Users");
const jwt = require("jsonwebtoken");
const Invoices = require("../models/Invoices");
const paypal = require("paypal-rest-sdk");
const nodemailer = require("nodemailer");
const home_url = process.env.PORT || "http://localhost:3001";

let userid = "";
let userEmail = "";
let tracklist = [];

const jwt_secret = process.env.SECRET_TOKEN;
const tokenDuration = 3 * 24 * 60 * 60;
const clientId = process.env.PAYPAL_ID;
const secret = process.env.PAYPAL_SECRET;
const execute_payment_json = {
  payer_id: null,
  transactions: [
    {
      amount: {
        currency: "EUR",
        total: 0,
      },
    },
  ],
};
const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: "587",
  auth: {
    user: "hortense.cummings65@ethereal.email",
    pass: "Wc8PQ7svBURP6c26WZ",
  },
});

// |||||||||||||||||||||||| Function ||||||||||||||||||||||||||

paypal.configure({
  mode: "sandbox", //sandbox or live
  client_id: clientId,
  client_secret: secret,
});

const SetPayment = (req, res, data, total) => {
  let items = data;
  console.log(items);
  console.log(total);
  const create_payment_json = {
    intent: "sale",
    payer: {
      payment_method: "paypal",
    },
    redirect_urls: {
      return_url: `${home_url}/api/checkout/success`,
      cancel_url: `${home_url}/api/checkout/cancel`,
    },
    transactions: [
      {
        item_list: {
          items: items,
        },
        amount: {
          currency: "EUR",
          total: total.toString(),
        },
        description: "Track purchase",
      },
    ],
  };
  execute_payment_json.transactions[0].amount.total = total;
  console.log(execute_payment_json.redirect_urls);

  paypal.payment.create(create_payment_json, (err, payment) => {
    if (err) {
      console.log(err.response.details);
      res.status(400).json({ message: err.details });
    } else {
      for (let i = 0; i < payment.links.length; i++) {
        if (payment.links[i].rel === "approval_url") {
          res.status(200).json({ redirect: payment.links[i].href });
        }
      }
    }
  });
};

// |||||||||||||||||||||||| Routes ||||||||||||||||||||||||||

module.exports.checkout_post = async (req, res) => {
  const { token, data, total, track_list } = req.body;
  if (token) {
    jwt.verify(token, jwt_secret, async (err, decodedToken) => {
      if (err) {
        console.log("Error occured on verify");
        console.log(err);
        res.locals.user = null;
        res.status(400).json({
          user: res.locals.user,
          message: "Error occured on verify",
        });
      } else {
        let user = await User.findById(decodedToken.id);
        userEmail = user.email;
        userid = user._id;
        tracklist = track_list;
        console.log(user);
        SetPayment(req, res, data, total);
      }
    });
  } else {
    console.log("No token finded");
    res.locals.user = null;
    res.status(400).json({
      isUser: false,
      user: res.locals.user,
      message: "No user logged",
    });
  }
};
module.exports.checkoutSuccess_get = async (req, res) => {
  try {
    let transactionDetail = null;

    const paymentId = req.query.paymentId;
    const payerId = req.query.PayerID;
    execute_payment_json.payer_id = payerId;

    paypal.payment.execute(
      paymentId,
      execute_payment_json,
      function (error, payment) {
        if (error) {
          console.log("err");
          console.log(error.response);
          throw error;
        } else {
          console.log(JSON.stringify(payment));
          transactionDetail = {
            sale: {
              id: payment.transactions[0].related_resources[0].sale.id,
              state: payment.transactions[0].related_resources[0].sale.state,
              amount: {
                total:
                  payment.transactions[0].related_resources[0].sale.amount
                    .total,
                currency:
                  payment.transactions[0].related_resources[0].sale.amount
                    .currency,
                details: {
                  subtotal:
                    payment.transactions[0].related_resources[0].sale.amount
                      .details.subtotal,
                  shipping:
                    payment.transactions[0].related_resources[0].sale.amount
                      .details.shipping,
                  insurance:
                    payment.transactions[0].related_resources[0].sale.amount
                      .details.insurance,
                  handling_fee:
                    payment.transactions[0].related_resources[0].sale.amount
                      .details.handling_fee,
                  shipping_discount:
                    payment.transactions[0].related_resources[0].sale.amount
                      .details.shipping_discount,
                  discount:
                    payment.transactions[0].related_resources[0].sale.amount
                      .details.discount,
                },
              },
              create_time:
                payment.transactions[0].related_resources[0].sale.create_time,
            },
          };
          console.log("user : " + userid);
          Promise.all([
            Invoices.create({
              id: transactionDetail.sale.id,
              user_id: userid,
              state: transactionDetail.sale.state,
              total: transactionDetail.sale.amount.total,
              currency: transactionDetail.sale.amount.currency,
              subtotal: transactionDetail.sale.amount.details.subtotal,
              shipping: transactionDetail.sale.amount.details.shipping,
              insurance: transactionDetail.sale.amount.details.insurance,
              handling_fee: transactionDetail.sale.amount.details.handling_fee,
              shipping_discount:
                transactionDetail.sale.amount.details.shipping_discount,
              discount: transactionDetail.sale.amount.details.discount,
              create_time: transactionDetail.sale.create_time,
            }),
          ])
            .then(async (result) => {
              let user = await User.find({ id: userid });
              let act_date = `${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`;
              //tracklist
              for (let index in tracklist) {
                let title = tracklist[index].title.replace(/[\s']/g, "_");
                console.log(title);
                let message = () => {
                  return `
                  <div>
                    <p>
                      Thank you for your purshase, here is the link for download
                      the track :
                    </p>
                    <a
                      href="https://res.cloudinary.com/iad-bdd-wetcse/video/upload/v1633854535/music_stream/downloads/${tracklist[index].license}/${tracklist[index].id}/${title}.mp3"
                      target="_blank">Link Here</a>
                  </div>`;
                };
                let mailOptions = {
                  from: "Music Stream Services - <hortense.cummings65@ethereal.email>",
                  to: userEmail,
                  subject: `Purshase - ${act_date}`,
                  html: message(),
                };
                transporter.sendMail(mailOptions, function (error, info) {
                  if (error) {
                    console.log("Error occured:" + error);
                  } else {
                    console.log("Email sent: " + info.response);
                  }
                });
              }
              console.log(result);
              res
                .status(200)
                .redirect(
                  `${
                    process.env.PORT || "http:localhost:3000"
                  }/checkout/success/${transactionDetail.sale.id}`
                );
            })
            .catch((err) => {
              console.log(err);
              res
                .status(200)
                .redirect(`${process.env.PORT || "http:localhost:3000"}/cart`);
            });
        }
      }
    );
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
module.exports.checkoutCancel_get = async (req, res) => {
  try {
    tracklist = [];
    console.log("Operation annuler");
    res.redirect(`${process.env.PORT || "http:localhost:3000"}/cart`);
  } catch (error) {
    console.log(error);
  }
};
module.exports.matching_id_post = async (req, res) => {
  let { transaction_id } = req.body;
  try {
    let _invoice = Invoices.find({ id: transaction_id });

    if (_invoice !== null) {
      res.status(200).json({ result: true });
    } else {
      res.status(200).json({ result: false });
    }
  } catch (error) {
    console.log(error);
  }
};

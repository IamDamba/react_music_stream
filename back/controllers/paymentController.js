// |||||||||||||||||||||||| Variables ||||||||||||||||||||||||||

const User = require("../models/Users");
const jwt = require("jsonwebtoken");
const jwt_secret = process.env.SECRET_TOKEN;
const tokenDuration = 3 * 24 * 60 * 60;
let userid = "";

const Invoices = require("../models/Invoices");

const paypal = require("paypal-rest-sdk");
const clientId = process.env.PAYPAL_ID;
const secret = process.env.PAYPAL_SECRET;
const cart = [
  {
    id: 1,
    name: "Track 1",
    img: "img 1",
    price: 29.99,
  },
  {
    id: 2,
    name: "Track 2",
    img: "img 2",
    price: 29.99,
  },
  {
    id: 3,
    name: "Track 3",
    img: "img 3",
    price: 29.99,
  },
];
let items = {
  data: [],
  total: 0,
};

// |||||||||||||||||||||||| Function ||||||||||||||||||||||||||

const createToken = (id) => {
  return jwt.sign({ id }, jwt_secret, {
    expiresIn: tokenDuration,
  });
};

for (let track in cart) {
  let item = {
    name: cart[track].name,
    sku: cart[track].id.toString(),
    price: cart[track].price.toString(),
    currency: "EUR",
    quantity: 1,
  };
  items.data.push(item);
  items.total += cart[track].price;
}

paypal.configure({
  mode: "sandbox", //sandbox or live
  client_id: clientId,
  client_secret: secret,
});

const SetPayment = (req, res) => {
  const create_payment_json = {
    intent: "sale",
    payer: {
      payment_method: "paypal",
    },
    redirect_urls: {
      return_url: "http://localhost:3001/api/purchase/payment/paypal/success",
      cancel_url: "http://localhost:3001/api/purchase/payment/paypal/cancel",
    },
    transactions: [
      {
        item_list: {
          items: items.data,
        },
        amount: {
          currency: "EUR",
          total: items.total.toString(),
        },
        description: "Hat for the best team ever",
      },
    ],
  };

  paypal.payment.create(create_payment_json, (err, payment) => {
    if (err) {
      throw err;
    } else {
      for (let i = 0; i < payment.links.length; i++) {
        if (payment.links[i].rel === "approval_url") {
          // res.redirect(payment.links[i].href);
          res.status(200).json({ redirect: payment.links[i].href });
        }
      }
    }
  });
};

// |||||||||||||||||||||||| Routes ||||||||||||||||||||||||||

module.exports.paymentPaypal_post = async (req, res) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, jwt_secret, async (err, decodedToken) => {
      if (err) {
        console.log("Error occured on verify");
        res.locals.user = null;
        res.status(400).json({
          isUser: false,
          user: res.locals.user,
          message: "Error occured on verify",
        });
      } else {
        let user = await User.findById(decodedToken.id);
        userid = user._id;
        console.log(user);
        SetPayment(req, res);
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
module.exports.paypalSuccess_get = async (req, res) => {
  try {
    let transactionDetail = undefined;

    console.log(req.query);
    const paymentId = req.query.paymentId;
    const payerId = req.query.PayerID;

    console.log("payer id" + payerId);
    console.log("paymentId" + paymentId);

    const execute_payment_json = {
      payer_id: payerId,
      transactions: [
        {
          amount: {
            currency: "EUR",
            total: items.total.toString(),
          },
        },
      ],
    };

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
          console.log('user : ' + userid);
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
            .then((result) => {
              console.log(result);
              res.status(200).json({
                message: "Invoice created",
                content: transactionDetail,
              });
            })
            .catch((err) => {
              console.log(err);
              res.status(400).json({
                message: err
              });
            });
        }
      }
    );
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
module.exports.paypalCancel_get = async (req, res) => {
  try {
    console.log("Operation annuler");
    res.status(200).json({ message: "Operation Annuler" });
  } catch (error) {
    console.log(error);
  }
};

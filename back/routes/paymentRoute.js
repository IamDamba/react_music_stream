const { Router } = require("express");
const router = Router();
const paymentController = require("../controllers/paymentController");

router.post("/api/purchase/payment/paypal", paymentController.paymentPaypal_post);
router.get("/api/purchase/payment/paypal/success", paymentController.paypalSuccess_get);
router.get("/api/purchase/payment/paypal/cancel", paymentController.paypalCancel_get);

module.exports = router;

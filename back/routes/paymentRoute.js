const { Router } = require("express");
const router = Router();
const paymentController = require("../controllers/paymentController");

router.post("/api/checkout", paymentController.checkout_post);
router.get("/api/checkout/success", paymentController.checkoutSuccess_get);
router.get("/api/checkout/cancel", paymentController.checkoutCancel_get);
router.post("/api/checkout/matching_id", paymentController.matching_id_post);

module.exports = router;

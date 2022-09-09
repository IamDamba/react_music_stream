const { Router } = require("express");
const router = Router();
const paymentController = require("../controllers/paymentController");

router.post("/checkout", paymentController.checkout_post);
router.get("/checkout/success", paymentController.checkoutSuccess_get);
router.get("/checkout/cancel", paymentController.checkoutCancel_get);
router.post("/checkout/matching_id", paymentController.matching_id_post);

module.exports = router;

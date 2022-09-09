const { Router } = require("express");
const router = Router();
const contactController = require("../controllers/contactController");

router.post("/contactform", contactController.contactform_post);
router.post("/newsletter", contactController.newsletter_post);
router.get("/unsubscribe", contactController.unsubscribe_get);

module.exports = router;

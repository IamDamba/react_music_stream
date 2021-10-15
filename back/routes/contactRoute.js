const { Router } = require("express");
const router = Router();
const contactController = require("../controllers/contactController");

router.post("/api/contactform", contactController.contactform_post);
router.post("/api/newsletter", contactController.newsletter_post);
router.delete("/api/unsubscribe", contactController.unsubscribe_delete);

module.exports = router;

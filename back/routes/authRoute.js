const { Router } = require("express");
const router = Router();
const authController = require("../controllers/authController");

router.post("/api/deleteaccount", authController.deleteaccount_post);
router.post("/api/currentuser", authController.currentuser_post);
router.post("/api/signin", authController.signin_post);
router.post("/api/signup", authController.signup_post);
router.put("/api/userupdate", authController.userupdate_put);
router.put("/api/updatepassword", authController.updatepassword_put);
router.post("/api/verifypassword", authController.verifypassword_post);

module.exports = router;

const { Router } = require("express");
const router = Router();
const authController = require("../controllers/authController");

router.post("/deleteaccount", authController.deleteaccount_post);
router.post("/currentuser", authController.currentuser_post);
router.post("/signin", authController.signin_post);
router.post("/signup", authController.signup_post);
router.put("/userupdate", authController.userupdate_put);
router.put("/updatepassword", authController.updatepassword_put);
router.post("/verifypassword", authController.verifypassword_post);
router.post("/userorders", authController.userorders_post);
router.post("/resetpassword", authController.resetpassword_post);
router.post("/forgottenpassword", authController.forgottenpassword_post);

module.exports = router;

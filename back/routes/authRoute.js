const { Router } = require("express");
const router = Router();
const authController = require("../controllers/authController");

router.get("/api/deleteaccount", authController.deleteaccount_get);
router.get("/api/signout", authController.signout_get);
router.get("/api/currentuser", authController.currentuser_get);
router.post("/api/signin", authController.signin_post);
router.post("/api/signup", authController.signup_post);

module.exports = router;

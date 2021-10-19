const { Router } = require("express");
const router = Router();
const memberController = require("../controllers/memberController");
const customSearch = require("../middlewares/members/customSearch");
const Users = require("../models/Users");

router.get("/api/member/currentmember", memberController.currentMember_get);
router.post("/api/member/signin", memberController.signin_post);

router.get(
  "/api/member/users",
  customSearch(Users, "_id", "username"),
  memberController.userList_get
);
// router.get("/api/member/users/u/", memberController.userId_get);

// router.get("/api/member/tracks/deletetrack", memberController.deleteTrack_post);
// router.post("/api/member/tracks/createtrack", memberController.createTrack_post);
// router.post("/api/member/tracks/updatetrack", memberController.updateTrack_post);

module.exports = router;

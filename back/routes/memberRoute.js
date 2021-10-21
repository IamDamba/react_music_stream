const { Router } = require("express");
const router = Router();
const memberController = require("../controllers/memberController");
const userSearch = require("../middlewares/members/userSearch");
const commentSearch = require("../middlewares/members/commentSearch");
const trackSearch = require("../middlewares/members/trackSearch");
const Users = require("../models/Users");
const Comments = require("../models/Comments");
const Tracks = require("../models/Tracks");

router.get("/api/member/currentmember", memberController.currentMember_get);
router.post("/api/member/signin", memberController.signin_post);

router.get(
  "/api/member/users",
  userSearch(Users),
  memberController.userList_get
);
router.post("/api/member/users/delete", memberController.userdelete_post);
router.get(
  "/api/member/comments",
  commentSearch(Comments),
  memberController.commentList_get
);
router.post("/api/member/comments/delete", memberController.commentdelete_post);
router.get(
  "/api/member/tracks",
  trackSearch(Tracks),
  memberController.trackList_get
);
router.post("/api/member/tracks/delete", memberController.trackdelete_post);
router.post("/api/member/tracks/update", memberController.trackupdate_post);
router.post("/api/member/tracks/add", memberController.trackadd_post);

module.exports = router;

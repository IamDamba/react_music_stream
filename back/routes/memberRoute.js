const { Router } = require("express");
const router = Router();
const memberController = require("../controllers/memberController");

router.get("/api/music_stream/member/zone/signout", memberController.signout_get);
router.get("/api/music_stream/member/zone/currentmember", memberController.currentMember_get);
router.post("/api/music_stream/member/zone/signin", memberController.signin_post);

router.get("/api/music_stream/member/zone/users", memberController.userList_get);
router.get("/api/music_stream/member/zone/users/u/", memberController.userId_get);

router.get("/api/music_stream/member/zone/tracks/deletetrack", memberController.deleteTrack_post);
router.post("/api/music_stream/member/zone/tracks/createtrack", memberController.createTrack_post);
router.post("/api/music_stream/member/zone/tracks/updatetrack", memberController.updateTrack_post);

module.exports = router;

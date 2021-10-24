const { Router } = require("express");
const router = Router();
const memberController = require("../controllers/memberController");
const userSearch = require("../middlewares/members/userSearch");
const commentSearch = require("../middlewares/members/commentSearch");
const trackSearch = require("../middlewares/members/trackSearch");
const newsletterSearch = require("../middlewares/members/newsletterSearch");
const invoiceSearch = require("../middlewares/members/invoiceSearch");
const Users = require("../models/Users");
const Comments = require("../models/Comments");
const Newsletters = require("../models/Newsletters");
const Tracks = require("../models/Tracks");
const Invoices = require("../models/Invoices");

// Member
router.post("/api/member/currentmember", memberController.currentMember_post);
router.post("/api/member/signin", memberController.signin_post);

//Users
router.get(
  "/api/member/users",
  userSearch(Users),
  memberController.userList_get
);
router.post("/api/member/users/delete", memberController.userdelete_post);

// Comments
router.get(
  "/api/member/comments",
  commentSearch(Comments),
  memberController.commentList_get
);
router.post("/api/member/comments/delete", memberController.commentdelete_post);

//Tracks
router.get(
  "/api/member/tracks",
  trackSearch(Tracks),
  memberController.trackList_get
);
router.post("/api/member/tracks/delete", memberController.trackdelete_post);
router.post("/api/member/tracks/update", memberController.trackupdate_post);
router.post("/api/member/tracks/add", memberController.trackadd_post);

//Noticicatons
router.get(
  "/api/member/newsletters",
  newsletterSearch(Newsletters),
  memberController.newsletterList_get
);

//Invoices
router.get(
  "/api/member/invoices",
  invoiceSearch(Invoices),
  memberController.invoiceList_get
);

module.exports = router;

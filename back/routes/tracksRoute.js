const { Router } = require("express");
const router = Router();
const tracksController = require("../controllers/tracksController");
const searchTracks = require("../middlewares/searchTracks");
const Tracks = require("../models/Tracks");

router.get("/api/tracks/all", tracksController.all_get);
router.get("/api/tracks/list", searchTracks(Tracks), tracksController.list_get);
router.get("/api/tracks/q/", tracksController.id_get);
router.post("/api/tracks/comments", tracksController.comments_post);
router.post(
  "/api/tracks/comments/create",
  tracksController.createcomments_post
);

module.exports = router;

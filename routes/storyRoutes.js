const express = require("express");
const router = express.Router();
const {
  getAllStories,
  getStoryById
} = require("../controllers/storyController");

router.get("/", getAllStories);
router.get("/:id", getStoryById);

module.exports = router;

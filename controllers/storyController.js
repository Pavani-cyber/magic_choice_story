const Story = require("../models/story");

// Get all stories
exports.getAllStories = async (req, res) => {
  try {
    const stories = await Story.find({}, "title coverImage ageGroup");
    res.json(stories);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch stories" });
  }
};

// Get single story by ID
exports.getStoryById = async (req, res) => {
  try {
    const story = await Story.findById(req.params.id);
    res.json(story);
  } catch (error) {
    res.status(404).json({ message: "Story not found" });
  }
};

const mongoose = require("mongoose");

// Schema for each story page
const pageSchema = new mongoose.Schema({
  pageNumber: Number,
  text: String,
  image: String,
  audio: String,
  question: String,
  yesNext: Number,
  noNext: Number
});

// Main story schema
const storySchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    coverImage: String,
    ageGroup: String,
    pages: [pageSchema]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Story", storySchema);

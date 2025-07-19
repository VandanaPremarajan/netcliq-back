const mongoose = require("mongoose");
const MoviesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    quality: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    subtitles: {
      type: String,
      required: true,
    },
    cast: {
      type: String,
      required: true,
    },
    genre_ID: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Genre",
        required: true,
      },
    ],
    video_file: {
      type: String,
      required: true,
    },
    poster: {
      type: String,
      required: true,
    },
    trailer_video: {
      type: String,
      required: true,
    },
    release_date: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Movies", MoviesSchema);

const mongoose = require("mongoose");
const episodeSchema = new mongoose.Schema({
  series_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Series', 
    required: true 
  },
  season_no: { 
    type: Number, 
    required: true 
  },
  episode_no: { 
    type: Number, 
    required: true 
  },
  title: { 
    type: String, 
    required: true 
  },
  description:{ 
    type: String, 
    required: true 
  },
  year: Number,
  duration: Number,
  quality: String,
  language: String,
  subtitles: [String],
  cast: [String],
  genre_id: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Genre",
      required: true,
    },
  ],
  video_file: String,
  poster: String,
  trailer_video: String,
  release_date: Date,
}, { timestamps: true });

module.exports = mongoose.model('Episode', episodeSchema);

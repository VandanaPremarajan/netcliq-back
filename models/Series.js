const mongoose = require("mongoose");
const seriesSchema = new mongoose.Schema(
  {
    title: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    year: { 
        type: Number, 
        required: true 
    },
    cast: { 
        type: Number, 
        required: true 
    },
    language: { 
        type: Number, 
        required: true 
    },
    genre_id: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Genre",
        required: true,
      },
    ],
    poster: String,
    trailer_video: String,
    release_date: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Series", seriesSchema);

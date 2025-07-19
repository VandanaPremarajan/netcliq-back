const express = require('express');
const router = express.Router();
const Movies = require('../models/Movies');
const upload = require('../middleware/Multer');
const { checkToken, allowRoles } = require('../middleware/Authentication');
const ROLES = require('../constants/roles');

// -------Protected Routes--------- //

router.use(checkToken);


// Add
router.post('/', allowRoles(ROLES.ADMIN), upload.fields(
    [{name: 'poster', maxCount: 1}, 
        {name: 'videoFile', maxCount:1}, 
        {name: 'trailerVideo', maxCount:1}, 
    ]) ,async (req, res) => {
        
    const { title, description, year, duration, quality, language, subtitles, cast, genre_ID, release_date } = req.body;

    if (!Array.isArray(genre_ID)) {
        genre_ID = [genre_ID];
    }

    const poster = req.files.poster ? req.files.poster[0].path : null;
    const video_file = req.files.videoFile ? req.files.videoFile[0].path : null; 
    const trailer_video = req.files.trailerVideo ? req.files.trailerVideo[0].path : null;

    try {
        const newMovie = new Movies({ title, description, year, duration, quality, language, subtitles, cast, genre_ID, video_file, poster, trailer_video, release_date });
        await newMovie.save();
        res.status(201).json(newMovie);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all
router.get('/', async (req, res) => {
    try {
        const movies = await Movies.find().populate('genre_ID');
        res.json(movies);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get by ID
router.get('/:id', allowRoles(ROLES.ADMIN), async (req, res) => {
    try {
        const movie = await Movies.findById(req.params.id);
        if (!movie) return res.status(404).json({ message: 'Movie is not found' });
        res.json(movie);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update
router.put('/:id', allowRoles(ROLES.ADMIN), upload.fields(
    [{name: 'poster', maxCount: 1}, 
        {name: 'videoFile', maxCount:1}, 
        {name: 'trailerVideo', maxCount:1}, 
    ]), async (req, res) => {
    const { title, description, year, duration, quality, language, subtitles, cast, genre_ID, release_date } = req.body;

    const poster = req.files.poster ? req.files.poster[0].path : null;
    const video_file = req.files.videoFile ? req.files.videoFile[0].path : null; 
    const trailer_video = req.files.trailerVideo ? req.files.trailerVideo[0].path : null;

    try {
        const movie = await Movies.findById(req.params.id);
        if (!movie) return res.status(404).json({ message: 'Movie is not found' });

        movie.title = title;
        movie.description = description;
        movie.year = year;
        movie.duration = duration;
        movie.quality = quality;
        movie.language = language;
        movie.subtitles = subtitles;
        movie.cast = cast;
        movie.genre_ID = genre_ID;
        movie.video_file = video_file;
        movie.poster = poster;
        movie.trailer_video = trailer_video;
        movie.release_date = release_date;

        await movie.save();
        res.json(movie);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete
router.delete('/:id', allowRoles(ROLES.ADMIN), async (req, res) => {
    try {
        const movie = await Movies.findById(req.params.id);
        if (!movie) return res.status(404).json({ message: 'Movie is not found' });

        await movie.deleteOne();
        res.json({ message: 'Movie is deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
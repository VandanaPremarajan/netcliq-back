const express = require('express');
const router = express.Router();
const Genre = require('../models/Genre');

// Create a new genre
router.post('/', async (req, res) => {
    const { name, description } = req.body;
    try {
        const newGenre = new Genre({ name, description });
        await newGenre.save();
        res.status(201).json(newGenre);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all genres
router.get('/', async (req, res) => {
    try {
        const genres = await Genre.find();
        res.json(genres);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a single genre by ID
router.get('/:id', async (req, res) => {
    try {
        const genre = await Genre.findById(req.params.id);
        if (!genre) return res.status(404).json({ message: 'Genre not found' });
        res.json(genre);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update an genre
router.put('/:id', async (req, res) => {
    const { name, description } = req.body;
    try {
        const genre = await Genre.findById(req.params.id);
        if (!genre) return res.status(404).json({ message: 'Genre not found' });

        genre.name = name;
        genre.description = description;

        await genre.save();
        res.json(genre);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete an genre
router.delete('/:id', async (req, res) => {
    try {
        const genre = await Genre.findById(req.params.id);
        if (!genre) return res.status(404).json({ message: 'Genre not found' });

        await genre.deleteOne();
        res.json({ message: 'Genre deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
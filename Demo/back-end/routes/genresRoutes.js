// const express = require('express');
// const router = express.Router();
// const genreController = require('../controllers/genresController.js');
import express from 'express';
import * as genreController from '../controller/genresController.js';

const router = express.Router();

router.get('/', genreController.getAllGenres);
router.get('/:id', genreController.getGenreById);
router.post('/', genreController.createGenre);
router.put('/:id', genreController.updateGenre);
router.delete('/:id', genreController.deleteGenre);

// module.exports = router;
export default router;

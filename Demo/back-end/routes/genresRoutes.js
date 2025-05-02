// const express = require('express');
// const router = express.Router();
// const genreController = require('../controllers/genresController.js');
import express from 'express';
import * as genreController from '../controller/genreController.js';

const router = express.Router();

router.get('/', genreController.getAllGenres);
// router.post('/', genreController.createGenre);
router.get('/:id', genreController.getGenreById);
router.put('/:id', genreController.updateGenre);
router.delete('/:id', genreController.deleteGenre);
router.get('/:id/books', genreController.getBooksByGenre);


// module.exports = router;
export default router;

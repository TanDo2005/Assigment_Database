import * as db from "../models/index.js";
const Genre = db.Genre;
import {sql} from "../config/db.js";

export const getAllGenres = async (req, res) => {
  try {
    const genres = await sql`
     SELECT * FROM Genres 
     ORDER BY Genreid ASC
    `
    res.status(500).json({ success: true, data: genres });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getGenreById = async (req, res) => {
  try {
    const genre = await Genre.findByPk(req.params.id);
    genre ? res.json(genre) : res.status(404).json({ message: 'Genre not found' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createGenre = async (req, res) => {
  try {
    const newGenre = await Genre.create(req.body);
    res.status(201).json(newGenre);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateGenre = async (req, res) => {
  try {
    const [updated] = await Genre.update(req.body, { where: { GenreID: req.params.id } });
    updated ? res.json({ message: 'Genre updated' }) : res.status(404).json({ message: 'Genre not found' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteGenre = async (req, res) => {
  try {
    const deleted = await Genre.destroy({ where: { GenreID: req.params.id } });
    deleted ? res.json({ message: 'Genre deleted' }) : res.status(404).json({ message: 'Genre not found' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
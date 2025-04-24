import * as db from "../models/index.js";
const Genre = db.Genre;
import { sql } from "../config/db.js";

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
  const { id } = req.params;
  try {
    // const genre = await Genre.findByPk(req.params.id);
    // genre ? res.json(genre) : res.status(404).json({ message: 'Genre not found' });
    const genre = await sql`
      SELECT * FROM Genres WHERE GenreID = ${id}
    `;

    if (genre.length === 0) {
      return res.status(404).json({ success: false, message: "Genre not found!" });
    }

    res.status(200).json({ success: true, data: genre[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createGenre = async (req, res) => {
  const { GenreName } = req.body;
  if (!GenreName) {
    return res.status(400).json({ success: false, message: "Please fill all fields" });
  }

  try {
    // const newGenre = await Genre.create(req.body);
    const newGenre = await sql`
      INSERT INTO Genres (GenreName)
      VALUES (${GenreName})
      RETURNING *
    `;
    // res.status(201).json(newGenre);
    res.status(201).json({ success: true, data: newGenre[0] });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateGenre = async (req, res) => {
  // try {
  //   const [updated] = await Genre.update(req.body, { where: { GenreID: req.params.id } });
  //   updated ? res.json({ message: 'Genre updated' }) : res.status(404).json({ message: 'Genre not found' });
  // } catch (err) {
  //   res.status(400).json({ error: err.message });
  // }
  const { GenreName } = req.body;
  if (!GenreName) {
    return res.status(400).json({ success: false, message: "Please fill all fields" });
  }

  try {
    const updated = await sql`
      UPDATE Genres
      SET GenreName = ${GenreName}
      WHERE GenreID = ${req.params.id}
      RETURNING *
    `;
    if (updated.length === 0) {
      return res.status(404).json({ success: false, message: "Genre not found!" });
    }
    res.status(200).json({ success: true, data: updated[0] });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteGenre = async (req, res) => {
  // try {
  //   const deleted = await Genre.destroy({ where: { GenreID: req.params.id } });
  //   deleted ? res.json({ message: 'Genre deleted' }) : res.status(404).json({ message: 'Genre not found' });
  // } catch (err) {
  //   res.status(500).json({ error: err.message });
  // }
  const { id } = req.params;

  try {
    const deleted = await sql`
      DELETE FROM Genres WHERE GenreID = ${id}
    `;
    if (deleted.rowCount === 0) {
      return res.status(404).json({ success: false, message: "Genre not found!" });
    }
    res.status(200).json({ success: true, message: "Genre deleted" });
  } catch (err) {
    console.log("Error deleting genre", err);
    res.status(500).json({ error: err.message });
  }
};

export const getBooksByGenreId = async (req, res) => {
  const { id } = req.params;

  try {
    const books = await sql`
      SELECT * FROM Books WHERE genreid = ${id}
      ORDER BY id ASC;
    `;

    if (books.length === 0) {
      res.status(404).json({ success: false, message: "NO BOOKS IN THIS GENRE" });
    }
    res.status(200).json({ success: true, data: books});
  } catch (err) {
    console.log("ERROR GET BOOK BY GENREDID:", err);
    res.status(500).json({ error: err.message });
  }
}
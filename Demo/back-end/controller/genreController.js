import {sql} from "../config/db.js";

export const getAllGenres = async (req, res) => {
    try {
        const genres = await sql `
            SELECT * FROM Genres
            ORDER BY Genreid ASC
        `;

        res.status(200).json({success: true, data: genres});
    } catch (error) {
        console.log("Error");
    }
};

export const getGenreById = async (req, res) => {
    const {id} = req.params;

    try {
        const genre = await sql `
            SELECT * FROM Genres WHERE genreid = ${id}
        `;

        if (genre.length === 0) {
            return res.status(404).json({success: false, message: "Genre not found!"});
        }

        res.status(200).json({success: true, data: genre[0]});
    } catch (error) {
        return res.status(500).json({success: false, message: "Error getting Genre"});
    }
};

export const getBooksByGenre = async (req, res) => {
    const {id} = req.params;

    try {
        const books = await sql `
            SELECT * FROM Books WHERE Genreid = ${id}
        `;

        if (books.length === 0) {
            return res.status(404).json({success: false, message: "Book not found!"});
        }

        res.status(200).json({success: true, data: books});
    } catch (error) {
        return res.status(500).json({success: false, message: "Error getting Book"});
    }
};

export const deleteGenre = async (req, res) => {
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


  export const updateGenre = async (req, res) => {
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
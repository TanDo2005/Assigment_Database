import { sql } from "../config/db.js";

export const getAllBooks = async (req, res) => {
    try {
        const books = await sql`
            SELECT * FROM Books 
            ORDER BY id ASC
        `;

        res.status(200).json({success:true, data: books});
    } catch (error) {
        console.log("")
        return res.status(500).json({ success: false, message: "Error getting books" });
    }
};

export const getYears = async (req, res) => {
    try {
        const years = await sql`
            SELECT DISTINCT publishedyear FROM books 
            ORDER BY publishedyear ASC
        `;

        res.status(200).json({success:true, data: years});
    } catch (error) {
        console.log("")
    }
};

export const getBookbyYear = async (req, res) => {
    const {y} = req.params;

    try {
        const book = await sql `
            SELECT * FROM Books WHERE publishedyear = ${y}
        `;

        if (book.length === 0) {
            return res.status(404).json({success: false, message: "Book not found!"});
        }

        res.status(200).json({success: true, data: book});
    } catch (error) {
        console.log("Error getting book", error);
        return res.status(500).json({success: false, message: "Error getting book"});
    }
};


export const getAllAuthors = async (req, res) => {
    try {
        const authors = await sql`
            SELECT * FROM Authors WHERE authorid = ${id}
        `;

        if (authors.length === 0) {
            return res.status(404).json({ success: false, message: "Author not found!" });
        }

        res.status(200).json({ success: true, data: authors[0] });
    } catch (error) {
        console.log("Error getting author", error);
        return res.status(500).json({ success: false, message: "Error getting author" });
    }

}

export const getGenresByBookId = async (req, res) => {
    const { id } = req.params;

    try {
        const genres = await sql`
        SELECT g.*
        FROM Genres g
        JOIN Books b ON g."genreid" = b."genreid"
        WHERE b.id = ${id}
      `;

        if (genres.length === 0) {
            return res.status(404).json({ success: false, message: "No genres found for this book" });
        }

        res.status(200).json({ success: true, data: genres });
    } catch (error) {
        console.log("Error fetching genres:", error);
        return res.status(500).json({ success: false, message: "Error fetching genres" });
    }
};

export const getBooksByYear = async (req, res) => {
    const { year } = req.params;

    try {
        const books = await sql`
            SELECT * FROM Books WHERE publishedYear = ${year}
        `;

        if (books.length === 0) {
            return res.status(404).json({ success: false, message: "No books found for this year" });
        }

        res.status(200).json({ success: true, data: books });
    } catch (error) {
        console.log("Error getting books by year", error);
        return res.status(500).json({ success: false, message: "Error getting books by year" });
    }
}
export const getBooksByYears = async (req, res) => {
    try {
        const books = await sql`
          SELECT publishedYear AS Year, string_agg(title, ', ') AS BookTitles
          FROM books
          GROUP BY publishedYear
          ORDER BY publishedYear ASC;
        `;
        res.status(200).json(books);  // Trả về dữ liệu dưới dạng JSON
      } catch (error) {
        console.error('Error getting books by year:', error);
        res.status(500).json({ error: 'Error retrieving books' });
      }
  };

// export const getAllAuthors = async (req, res) => {
//     try {
//         const authors = await sql`
//             SELECT * FROM Authors
//             ORDER BY authorid ASC
//         `;

//         res.status(200).json({ success: true, data: authors });
//     } catch (error) {
//         console.log("Error getting authors", error);
//         return res.status(500).json({ success: false, message: "Error getting authors" });
//     }
// }

// export const getAllGenres = async (req, res) => {
//     try {
//         const genres = await sql `
//             SELECT * FROM Genres
//             ORDER BY genreid ASC
//         `;

//         res.status(200).json({success: true, data: genres});
//     } catch (error) {
//         console.log("");
//     }
// }

export const createBook = async (req, res) => {
    const { id, title, price, stock, publishedYear, authorid, genreid } = req.body;

    if (!title || !price || !stock || !publishedYear || !authorid || !genreid) {
        return res.status(400).json({ success: false, message: "Please fill all fields" });
    }

    try {
        const newBook = await sql`
            INSERT INTO Books (id, title, price, stock, publishedYear, authorid, genreid)
            VALUES (${id}, ${title}, ${price}, ${stock}, ${publishedYear}, ${authorid}, ${genreid})
            RETURNING *
        `;

        console.log("New book created", newBook);
        res.status(201).json({ success: true, data: newBook[0] });
    } catch (error) {
        console.log("Error creating book", error);
        return res.status(500).json({ success: false, message: "Error creating book" + error });
    }
};


export const getBook = async (req, res) => {
    const { id } = req.params;

    try {
        const book = await sql`
            SELECT * FROM Books WHERE id = ${id}
        `;

        if (book.length === 0) {
            return res.status(404).json({ success: false, message: "Book not found!" });
        }

        res.status(200).json({ success: true, data: book[0] });
    } catch (error) {
        console.log("Error getting book", error);
        return res.status(500).json({ success: false, message: "Error getting book" });
    }
};

export const updateBook = async (req, res) => {
    const { id } = req.params;

    const { title, price, stock, authorid, genreid } = req.body;

    console.log(id, genreid)

    try {

        const updatedBook = await sql`
            UPDATE Books
            SET title = ${title}, price = ${price}, stock = ${stock}, authorid = ${authorid}, genreid = ${genreid}
            WHERE id = ${id}
            RETURNING *
        `;

        if (updatedBook.length === 0) {
            return res.status(404).json({ success: false, message: "Book not found" });
        }

        res.status(200).json({ success: true, data: updatedBook[0] });
    } catch (error) {
        console.log("Error updating book", error);
        return res.status(500).json({ success: false, message: "Error updating book" });
    }
};

export const deleteBook = async (req, res) => {
    const { id } = req.params;

    try {

        const deletedBook = await sql`
            DELETE FROM Books WHERE id = ${id} RETURNING *
        `;

        if (deletedBook.length === 0) {
            return res.status(404).json({ success: false, message: "Book not found" }); x
        }

        res.status(200).json({ success: true, data: deletedBook[0] })
    } catch { error } {
        console.log("Error deleting book", error);
        return res.status(500).json({ success: false, message: "Error deleting book" });
    }
};

export const getAuthorsByBookId = async (req, res) => {
    const { id } = req.params;

    try {
        const authors = await sql`
            SELECT a.*
            FROM Authors a
            JOIN Books b ON a.authorid = b.authorid
            WHERE b.id = ${id}
        `;

        if (authors.length === 0) {
            return res.status(404).json({ success: false, message: "No authors found for this book" });
        }

        res.status(200).json({ success: true, data: authors });
    } catch (error) {
        console.log("Error fetching authors:", error);
        return res.status(500).json({ success: false, message: "Error fetching authors" });
    }
}
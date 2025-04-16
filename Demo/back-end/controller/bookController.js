import {sql} from "../config/db.js";

export const getAllBooks = async (req, res) => {
    try {
        const books = await sql`
            SELECT * FROM Books 
            ORDER BY id DESC
        `;

        console.log("Books");
        res.status(200).json({success:true, data: books});
    } catch (error) {
        console.log("")
    }
};



export const createBook = async (req, res) => {
    const {id, title, price, stock, publishedYear, authorid, genreid} = req.body;

    if (!id || !title || !price || !stock || !publishedYear || !authorid || !genreid) {
        return res.status(400).json({success: false, message: "Please fill all fields"});
    }

    try {
        const newBook = await sql`
            INSERT INTO Books (id, title, price, stock, publishedYear, authorid, genreid)
            VALUES (${id}, ${title}, ${price}, ${stock}, ${publishedYear}, ${authorid}, ${genreid})
            RETURNING *
        `;

        console.log("New book created", newBook);
        res.status(201).json({success: true, data: newBook[0]});
    } catch (error) {
        console.log("Error creating book", error);
        return res.status(500).json({success: false, message: "Error creating book" + error});
    }
};

export const getBook = async (req, res) => {
    const {id} = req.params;

    try {
        const book = await sql `
            SELECT * FROM Books WHERE id = ${id}
        `;

        if (book.length === 0) {
            return res.status(404).json({success: false, message: "Book not found!"});
        }

        res.status(200).json({success: true, data: book[0]});
    } catch (error) {
        console.log("Error getting book", error);
        return res.status(500).json({success: false, message: "Error getting book"});
    }
};

export const updateBook = async (req, res) => {
    const {id} = req.params;

    const {title, price, stock} = req.body;

    try {

        const updatedBook = await sql`
            UPDATE Books
            SET title = ${title}, price = ${price}, stock = ${stock}
            WHERE id = ${id}
            RETURNING *
        `;

        if (updatedBook.length === 0) {
            return res.status(404).json({success: false, message: "Book not found"});
        }

        res.status(200).json({success: true, data: updatedBook[0]});
    } catch (error) {
        console.log("Error updating book", error);
        return res.status(500).json({success: false, message: "Error updating book"});
    }
};

export const deleteBook = async (req, res) => {
    const {id} = req.params;

    try {

        const deletedBook = await sql`
            DELETE FROM Books WHERE id = ${id} RETURNING *
        `;

        if (deletedBook.length === 0) {
            return res.status(404).json({success: false, message: "Book not found"});x
        }

        res.status(200).json({success: true, data: deletedBook[0]})
    } catch {error} {
        console.log("Error deleting book", error);
        return res.status(500).json({success: false, message: "Error deleting book"});
    }
};
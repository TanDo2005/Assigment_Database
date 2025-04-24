import {sql} from "../config/db.js";

export const getAllAuthors = async (req, res) => {
    try {
        const authors = await sql `
            SELECT * FROM Authors
            ORDER BY Authorid ASC
        `;

        res.status(200).json({success: true, data: authors});
    } catch (error) {
        console.log("Error");
    }
};

export const getAuthor = async (req, res) => {
    const {id} = req.params;

    try {
        const author = await sql `
            SELECT * FROM Authors WHERE authorid = ${id}
        `;

        if (author.length === 0) {
            return res.status(404).json({success: false, message: "Author not found!"});
        }

        res.status(200).json({success: true, data: author[0]});
    } catch (error) {
        return res.status(500).json({success: false, message: "Error getting author"});
    }
};

export const getBooksByAuthor = async (req, res) => {
    const {id} = req.params;

    try {
        const books = await sql `
            SELECT * FROM Books WHERE authorid = ${id}
        `;

        if (books.length === 0) {
            return res.status(404).json({success: false, message: "Book not found!"});
        }

        res.status(200).json({success: true, data: books});
    } catch (error) {
        return res.status(500).json({success: false, message: "Error getting Book"});
    }
};
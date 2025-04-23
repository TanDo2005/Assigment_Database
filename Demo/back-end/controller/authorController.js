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
        const book = await sql `
            SELECT * FROM Authors WHERE authorid = ${id}
        `;

        if (book.length === 0) {
            return res.status(404).json({success: false, message: "Author not found!"});
        }

        res.status(200).json({success: true, data: book[0]});
    } catch (error) {
        return res.status(500).json({success: false, message: "Error getting author"});
    }
};

export const getBookByAuthor = async (req, res) => {
    const {id} = req.params;

    try {
        const book = await sql `
            SELECT * FROM Books WHERE authorid = ${id}
        `;

        if (book.length === 0) {
            return res.status(404).json({success: false, message: "Book not found!"});
        }

        res.status(200).json({success: true, data: book[0]});
    } catch (error) {
        return res.status(500).json({success: false, message: "Error getting Book"});
    }
};
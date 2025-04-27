import { sql } from "../config/db.js";

export const getAllAuthors = async (req, res) => {
    try {
        const authors = await sql`
            SELECT * FROM Authors
            ORDER BY Authorid ASC
        `;

        res.status(200).json({ success: true, data: authors });
    } catch (error) {
        console.log("Error");
        res.status(500).json({ success: false, message: "Error getting authors" });
    }
};

export const getAuthor = async (req, res) => {
    const { id } = req.params;

    try {
        const author = await sql `
            SELECT * FROM Authors WHERE authorid = ${id};
        `;

        if (author.length === 0) {
            return res.status(404).json({success: false, message: "Author not found!"});
        }
        res.status(200).json({success: true, data: author[0]});
    } catch (error) {
        console.log("Error getting author", error);
        return res.status(500).json({ success: false, message: "Error getting author" });
    }
};

export const getBooksByAuthor = async (req, res) => {
    try {
        const books = await sql `
            SELECT * FROM Books WHERE authorid = ${id}
        `;

        if (books.length === 0) {
            return res.status(404).json({success: false, message: "Book not found!"});
        }
        res.status(200).json({success: true, data: books});
        // res.status(200).json({ success: true, data: book[0] });
        
    } catch (error) {
        console.log("Error getting book", error);
        return res.status(500).json({ success: false, message: "Error getting Book" });
    }
};

export const createAuthor = async (req, res) => {
    const { name, nationality } = req.body;
    if(!name || !nationality){
        return res.status(400).json({ success: false, message: "Please provide all required fields" });
    }
    
    try {
        const newAuthor = await Author.create(req.body);
        res.status(201).json(newAuthor);
    } catch (err) {
        console.log("Error creating author", err);
        res.status(400).json({ error: err.message });
    }
};

export const updateAuthor = async (req, res) => {
    try {
        const [updated] = await Author.update(req.body, { where: { AuthorID: req.params.id } });
        updated ? res.json({ message: 'Author updated' }) : res.status(404).json({ success: false, message: 'Author not found' });
    } catch (err) {
        console.log("Error updating author", err);
        res.status(400).json({ error: err.message });
    }
};

export const deleteAuthor = async (req, res) => {
    try {
        const deleted = await Author.destroy({ where: { AuthorID: req.params.id } });
        deleted ? res.json({ message: 'Author deleted' }) : res.status(404).json({ success: false, message: 'Author not found' });
    } catch (err) {
        console.log("Error deleting author", err);
        res.status(500).json({ error: err.message });
    }
};
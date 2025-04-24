import express from "express";
import * as bookController from "../controller/bookController.js";

const router = express.Router();

router.get("/", bookController.getAllBooks);
router.get("/years", bookController.getBooksByYears);
router.get("/years/:year", bookController.getBooksByYear);
router.get("/:id", bookController.getBook);
router.post("/", bookController.createBook);
router.put("/:id", bookController.updateBook);
router.delete("/:id", bookController.deleteBook);
router.get("/:id/authors", bookController.getAuthorsByBookId);
router.get("/:id/genres", bookController.getGenresByBookId);


export default router;
import express from "express";
import * as Controller from "../controller/genreController.js";

const router = express.Router();

router.get("/", Controller.getAllGenres);
router.get("/:id", Controller.getGenre);
router.get("/:id/books", Controller.getBooksByGenre);


export default router;
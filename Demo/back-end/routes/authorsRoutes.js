import express from "express";
import * as Controller from "../controller/authorController.js";

const router = express.Router();

router.get("/", Controller.getAllAuthors);
router.get("/:id", Controller.getAuthor);
router.get("/:id/books", Controller.getBookByAuthor);


export default router;
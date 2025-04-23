import express from "express";
import * as bookController from "../controller/bookController.js";

const router = express.Router();

router.get("/", bookController.getAllBooks);
router.get("/years", bookController.getYears);
router.get("/years/:y", bookController.getBookbyYear);
router.get("/:id", bookController.getBook);
router.post("/", bookController.createBook);
router.put("/:id", bookController.updateBook);
router.delete("/:id", bookController.deleteBook);


export default router;
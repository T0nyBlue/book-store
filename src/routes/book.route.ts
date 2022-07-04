import express, { Express, Request, Response } from "express";
import bookController from "../controllers/book.controller";
const router = express.Router();

router.get("/", bookController.get);
router.post("/", bookController.create);
router.put("/", bookController.update);
router.delete("/", bookController.delete);

export default router;

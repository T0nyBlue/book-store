const express = require("express");
const router = express.Router();
const bookController = require("../controllers/book.controller");

router.get("/", bookController.get);
router.post("/", bookController.create);
router.put("/", bookController.update);
router.delete("/", bookController.delete);

module.exports = router;
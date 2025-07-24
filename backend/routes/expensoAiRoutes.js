const express = require("express");
const router = express.Router();
const { expenoAIChatBot } = require("../controllers/expensoAiController");
const { protect } = require("../middlewares/authMiddleware");

router.post("/",protect, expenoAIChatBot);

module.exports = router;

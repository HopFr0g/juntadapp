const reunionController = require("../controllers/reunionController.js");

const express = require("express");
const router = express.Router();

router.get("/", reunionController.findAllReuniones);
router.get("/:id", reunionController.findReunionById);
router.post("/", reunionController.createReunion);

module.exports = router;
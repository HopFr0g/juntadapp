const reunionController = require("../controllers/reunionController.js");

const express = require("express");
const router = express.Router();

router.get("/", reunionController.findAll);
router.get("/:id", reunionController.findById);
router.post("/", reunionController.create);

module.exports = router;
const reunionController = require("../controllers/reunionController.js");

const express = require("express");
const router = express.Router();

router.get("/", reunionController.findAllReuniones);

module.exports = router;
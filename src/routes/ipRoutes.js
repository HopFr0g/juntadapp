const ipController = require("../controllers/ipController.js");

const express = require("express");
const router = express.Router();

router.get("/", ipController.findAll);

module.exports = router;
const ipController = require("../controllers/ipController.js");

const express = require("express");
const router = express.Router();

router.get("/", ipController.findAllIps);

module.exports = router;
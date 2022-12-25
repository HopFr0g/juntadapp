const personaController = require("../controllers/personaController.js");

const express = require("express");
const router = express.Router();

router.get("/:hash", personaController.findAllByHash);
router.post("/", personaController.create);

module.exports = router;
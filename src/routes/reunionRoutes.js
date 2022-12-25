const reunionController = require("../controllers/reunionController.js");

const express = require("express");
const router = express.Router();

router.get("/:hash", reunionController.findByHash);
router.post("/", reunionController.create);

module.exports = router;
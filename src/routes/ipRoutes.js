const ipController = require("../controllers/ipController.js");

const express = require("express");
const router = express.Router();

router.get("/", ipController.findAll);
router.get("/:id", ipController.findById);
router.post("/", ipController.create);

module.exports = router;
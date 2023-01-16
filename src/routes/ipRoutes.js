const ipController = require("../controllers/ipController.js");

const express = require("express");
const router = express.Router();

/**
 * @openapi
 * /api/ip:
 *   get:
 *     tags:
 *       - Ip
 *     responses:
 *       default:
 *         $ref: '#/components/responses/default'
 */
router.get("/", ipController.findAll);

module.exports = router;
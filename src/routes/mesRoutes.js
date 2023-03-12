const mesController = require("../controllers/mesController.js");

const express = require("express");
const router = express.Router();

/**
 * @openapi
 * /api/mes:
 *   get:
 *     tags:
 *       - Mes
 *     responses:
 *       default:
 *         $ref: '#/components/responses/default'
 */
router.get("/", mesController.findAllProximos);

module.exports = router;
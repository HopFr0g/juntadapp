const fechaController = require("../controllers/fechaController.js");

const express = require("express");
const router = express.Router();

/**
 * @openapi
 * /api/fecha/{hash}:
 *   get:
 *     tags:
 *       - Fecha
 *     parameters:
 *       - in: path
 *         name: hash
 *         schema:
 *           type: string
 *     responses:
 *       default:
 *         $ref: '#/components/responses/default'
 */
router.get("/:hash", fechaController.findCoincidenciasByReunion);

module.exports = router;
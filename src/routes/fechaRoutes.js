const fechaController = require("../controllers/fechaController.js");

const express = require("express");
const router = express.Router();

/**
 * @openapi
 * /api/fecha/{hash}:
 *   post:
 *     description: Para la Reunion con el hash dado, devuelve las entidades de Fecha en que todas las Persona de dicha Reunion coinciden.
 *     tags:
 *       - Fecha
 *     parameters:
 *       - in: path
 *         name: hash
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/Coincidencias'
 *     responses:
 *       default:
 *         $ref: '#/components/responses/default'
 */
router.post("/:hash", fechaController.findCoincidenciasByReunion);

module.exports = router;
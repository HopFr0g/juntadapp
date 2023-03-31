const fechaController = require("../controllers/fechaController.js");
const fechaValidator = require("../validator/fechaValidator.js");

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
router.post("/:hash", fechaValidator.findCoincidenciasByReunion, fechaController.findCoincidenciasByReunion);

/**
 * @openapi
 * /api/fecha/{hash}:
 *   get:
 *     description: Para la Reunion con el hash dado, devuelve todas sus fechas junto a la cantidad de personas que coinciden ese día.
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
router.get("/:hash", fechaController.findCoincidenciasDiariasByReunion);

module.exports = router;
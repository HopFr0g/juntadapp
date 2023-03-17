const personaController = require("../controllers/personaController.js");

const express = require("express");
const router = express.Router();

/**
 * @openapi
 * /api/persona/{hash}:
 *   get:
 *     description: Obtiene todas las entidades de Persona pertenecientes a la Reunion con el hash dado.
 *     tags:
 *       - Persona
 *     parameters:
 *       - in: path
 *         name: hash
 *         schema:
 *           type: string
 *     responses:
 *       default:
 *         $ref: '#/components/responses/default'
 */
router.get("/:hash", personaController.findAllByHash);

/**
 * @openapi
 * /api/persona:
 *   post:
 *     description: Crea una nueva Persona.
 *     tags:
 *       - Persona
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/Persona'
 *     responses:
 *       default:
 *         $ref: '#/components/responses/default'
 */
router.post("/", personaController.create);

module.exports = router;
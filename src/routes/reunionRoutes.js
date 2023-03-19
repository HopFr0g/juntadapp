const reunionController = require("../controllers/reunionController.js");
const reunionValidator = require("../validator/reunionValidator.js");

const express = require("express");
const router = express.Router();

/**
 * @openapi
 * /api/reunion/{hash}:
 *   get:
 *     description: Obtiene toda la información de la Reunion con el hash dado.
 *     tags:
 *       - Reunion
 *     parameters:
 *       - in: path
 *         name: hash
 *         schema:
 *           type: string
 *     responses:
 *       default:
 *         $ref: '#/components/responses/default'
 */
router.get("/:hash", reunionController.findByHash);

/**
 * @openapi
 * /api/reunion:
 *   post:
 *     description: Crea una nueva Reunion.
 *     tags:
 *       - Reunion
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             $ref: '#/components/schemas/Reunion'
 *     responses:
 *       default:
 *         $ref: '#/components/responses/default'
 */
router.post("/", reunionValidator.create, reunionController.create);

module.exports = router;
const ipController = require("../controllers/ipController.js");

const express = require("express");
const router = express.Router();

/**
 * @openapi
 * /api/ip:
 *   get:
 *     description: Request con fines de debug únicamente. Obtiene todas las entidades Ip de la base de datos junto a todas sus Persona y Reunion asociadas. Debe ser deshabilitado en producción.
 *     tags:
 *       - Ip
 *     responses:
 *       default:
 *         $ref: '#/components/responses/default'
 */
router.get("/", ipController.findAll);

module.exports = router;
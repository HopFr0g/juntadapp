const mesController = require("../controllers/mesController.js");

const express = require("express");
const router = express.Router();

/**
 * @openapi
 * /api/mes:
 *   get:
 *     description: Retorna las 6 entidades de Mes más cercanas. La primera entidad corresponde al mes corriente; las restantes corresponden a los próximos 5 meses.
 *     tags:
 *       - Mes
 *     responses:
 *       default:
 *         $ref: '#/components/responses/default'
 */
router.get("/", mesController.findAllProximos);

module.exports = router;
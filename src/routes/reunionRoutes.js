const reunionController = require("../controllers/reunionController.js");

const express = require("express");
const router = express.Router();

/**
 * @openapi
 * /api/reunion/{hash}:
 *   get:
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
router.post("/", reunionController.create);

module.exports = router;
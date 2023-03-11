const {NotFoundError} = require("../errors/errors.js");
const constants = require("../util/constants.js");
const responseBuilder = require("../util/responseBuilder.js");

const personaService = require("../services/personaService.js");

const findAllByHash = async (req, res) => {
    let response;
    try {
        let hash = req.params.hash;
        let personas = await personaService.findAllByHash(hash);
        if (!Array.isArray(personas) || personas.length == 0)
            throw new NotFoundError(constants.ENTIDADES_NO_ENCONTRADAS);
        response = responseBuilder.getOkResponse(constants.ENTIDADES_ENCONTRADAS, personas);
    } catch (error) {
        response = responseBuilder.getBadResponse(error);
    }
    res.status(response.status).json(response);
};

const create = async (req, res) => {
    let response;
    try {
        let requestBody = req.body;
        let requestIp = req.ip;
        let persona = await personaService.create(requestBody.nombre, requestBody.meses, requestBody.reunionHash, requestIp);
        response = responseBuilder.getOkResponse(constants.INSERCION_EXITOSA + persona.id, persona);
    } catch (error) {
        response = responseBuilder.getBadResponse(error);
    }
    res.status(response.status).json(response);
};

module.exports = {
    findAllByHash,
    create
};
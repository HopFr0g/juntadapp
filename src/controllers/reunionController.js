const constants = require("../util/constants.js");
const responseBuilder = require("../util/responseBuilder.js");

const reunionService = require("../services/reunionService.js");

const findByHash = async (req, res) => {
    let response;
    try {
        let hash = req.params.hash;
        let reunion = await reunionService.findByHash(hash);
        response = responseBuilder.getOkResponse(constants.ENTIDAD_ENCONTRADA + hash, reunion);
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
        let reunion = await reunionService.create(requestBody.nombre, requestBody.descripcion, requestIp);
        response = responseBuilder.getOkResponse(constants.INSERCION_EXITOSA + reunion.id, reunion);
    } catch (error) {
        response = responseBuilder.getBadResponse(error);
    }
    res.status(response.status).json(response);
};

module.exports = {
    findByHash,
    create
};
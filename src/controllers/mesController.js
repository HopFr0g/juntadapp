const {InternalServerError} = require("../errors/errors.js");
const constants = require("../util/constants.js");
const responseBuilder = require("../util/responseBuilder.js");

const mesService = require("../services/mesService.js");

const findAllProximos = async (req, res) => {
    let response;
    try {
        let meses = await mesService.findAllProximos();
        if (!Array.isArray(meses) || meses.length == 0)
            throw new InternalServerError(constants.ERROR_INESPERADO);
        response = responseBuilder.getOkResponse(constants.ENTIDADES_ENCONTRADAS, meses);
    } catch (error) {
        response = responseBuilder.getBadResponse(error);
    }
    res.status(response.status).json(response);
};

module.exports = {
    findAllProximos
};
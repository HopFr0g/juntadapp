const {NotFoundError} = require("../errors/errors.js");
const constants = require("../util/constants.js");
const responseBuilder = require("../util/responseBuilder.js");

const fechaService = require("../services/fechaService.js");

const findCoincidenciasByReunion = async (req, res) => {
    let response;
    try {
        let reunionHash = req.params.hash;
        let idPersonas = req.body.idPersonas;
        let fechas = await fechaService.findCoincidenciasByReunion(reunionHash, idPersonas);
        if (!Array.isArray(fechas) || fechas.length == 0)
            throw new NotFoundError(constants.ENTIDADES_NO_ENCONTRADAS);
        response = responseBuilder.getOkResponse(constants.ENTIDADES_ENCONTRADAS, fechas);
    } catch (error) {
        response = responseBuilder.getBadResponse(error);
    }
    res.status(response.status).json(response);
};

module.exports = {
    findCoincidenciasByReunion
};
const {NotFoundError} = require("../errors/errors.js");
const constants = require("../util/constants.js");
const responseBuilder = require("../util/responseBuilder.js");

const ipService = require("../services/ipService.js");

const findAll = async (req, res) => {
    let response;
    try {
        let ips = await ipService.findAll();
        if (!Array.isArray(ips) || ips.length == 0)
            throw new NotFoundError(constants.ENTIDADES_NO_ENCONTRADAS);
        response = responseBuilder.getOkResponse(constants.ENTIDADES_ENCONTRADAS, ips);
    } catch (error) {
        response = responseBuilder.getBadResponse(error);
    }
    res.status(response.status).json(response);
};

module.exports = {
    findAll
};
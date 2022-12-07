const constants = require("../util/constants.js");
const responseBuilder = require("../util/responseBuilder.js");

const reunionService = require("../services/reunionService.js");

const findAllReuniones = async (req, res) => {
    let response;
    
    try {
        response = await reunionService.findAllReuniones();
    } catch (error) {
        response = responseBuilder.getBadResponse(constants.ERROR_INESPERADO, error, 500);
    }
    
    res.status(response.status).json(response);
}

module.exports = {
    findAllReuniones
};
const constants = require("../util/constants.js");
const responseBuilder = require("../util/responseBuilder.js");

const reunionService = require("../services/reunionService.js");

const findAllReuniones = async (req, res) => {
    let response;
    
    try {
        response = await reunionService.findAllReuniones();
    } catch (error) {
        response = responseBuilder.getBadResponse(error, 500);
    }
    
    res.status(response.status).json(response);
}

const findReunionById = async (req, res) => {
    let response;
    
    try {
        let id = req.params.id;
        response = await reunionService.findReunionById(id);
    } catch (error) {
        response = responseBuilder.getBadResponse(error, 500);
    }
    
    res.status(response.status).json(response);
}

module.exports = {
    findAllReuniones,
    findReunionById
};
const constants = require("../util/constants.js");
const responseBuilder = require("../util/responseBuilder.js");

const reunionService = require("../services/reunionService.js");

const findAll = async (req, res) => {
    let response;
    
    try {
    list = await reunionService.findAll();
    
    if (!Array.isArray(list) || list.length == 0)
            throw constants.ENTIDADES_NO_ENCONTRADAS;
        
        response = responseBuilder.getOkResponse(constants.ENTIDADES_ENCONTRADAS, list);
    } catch (error) {
        response = responseBuilder.getBadResponse(error, 500);
    }
    
    res.status(response.status).json(response);
};

const findById = async (req, res) => {
    let response;
    
    try {
        let id = req.params.id;
        
        reunion = await reunionService.findById(id);
        
        response = responseBuilder.getOkResponse(constants.ENTIDAD_ENCONTRADA + id, reunion);
    } catch (error) {
        response = responseBuilder.getBadResponse(error, 500);
    }
    
    res.status(response.status).json(response);
};

const create = async (req, res) => {
    let response;
    
    try {
        let requestBody = req.body;
        let requestIp = req.ip;
        
        reunion = await reunionService.create(requestBody, requestIp);
        
        response = responseBuilder.getOkResponse(constants.INSERCION_EXITOSA + reunion.id, reunion);
    } catch (error) {
        response = responseBuilder.getBadResponse(error, 500);
    }
    
    res.status(response.status).json(response);
};

module.exports = {
    findAll,
    findById,
    create
};
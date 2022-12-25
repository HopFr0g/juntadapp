const constants = require("../util/constants.js");
const responseBuilder = require("../util/responseBuilder.js");

const personaService = require("../services/personaService.js");

const findAllByHash = async (req, res) => {
    let response;
    
    try {
        let hash = req.params.hash;
        
        let list = await personaService.findAllByHash(hash);
        
        if (!Array.isArray(list) || list.length == 0)
            throw constants.ENTIDADES_NO_ENCONTRADAS;
        
        response = responseBuilder.getOkResponse(constants.ENTIDADES_ENCONTRADAS, list);
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
        
        let nombre = requestBody.nombre;
        let reunionHash = requestBody.reunionHash;
        
        let persona = {
            nombre
        };
        
        persona = await personaService.create(persona, reunionHash, requestIp);
        
        response = responseBuilder.getOkResponse(constants.INSERCION_EXITOSA + persona.id, persona);
    } catch (error) {
        response = responseBuilder.getBadResponse(error, 500);
    }
    
    res.status(response.status).json(response);
};

module.exports = {
    findAllByHash,
    create
};
const constants = require("../util/constants.js");
const responseBuilder = require("../util/responseBuilder.js");

const fechaService = require("../services/fechaService.js");

const findCoincidenciasByReunion = async (req, res) => {
    let response;
    
    try {
        let reunionHash = req.params.hash;
        
        let list = await fechaService.findCoincidenciasByReunion(reunionHash);
    
        if (!Array.isArray(list) || list.length == 0)
            throw constants.ENTIDADES_NO_ENCONTRADAS;
        
        response = responseBuilder.getOkResponse(constants.ENTIDADES_ENCONTRADAS, list);
    } catch (error) {
        response = responseBuilder.getBadResponse(error, 500);
    }
    
    res.status(response.status).json(response);
};

module.exports = {
    findCoincidenciasByReunion
};
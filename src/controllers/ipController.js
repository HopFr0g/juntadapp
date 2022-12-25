const constants = require("../util/constants.js");
const responseBuilder = require("../util/responseBuilder.js");

const ipService = require("../services/ipService.js");

const findAll = async (req, res) => {
    let response;
    
    try {
        let list = await ipService.findAll();
        
        if (!Array.isArray(list) || list.length == 0)
            throw constants.ENTIDADES_NO_ENCONTRADAS;
        
        response = responseBuilder.getOkResponse(constants.ENTIDADES_ENCONTRADAS, list);
    } catch (error) {
        response = responseBuilder.getBadResponse(error, 500);
    }
    
    res.status(response.status).json(response);
};

module.exports = {
    findAll
};
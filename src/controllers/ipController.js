const constants = require("../util/constants.js");
const responseBuilder = require("../util/responseBuilder.js");

const ipService = require("../services/ipService.js");

const findAllIps = async (req, res) => {
    let response;
    
    try {
        response = await ipService.findAllIps();
    } catch (error) {
        response = responseBuilder.getBadResponse(error, 500);
    }
    
    res.status(response.status).json(response);
}

module.exports = {
    findAllIps
};
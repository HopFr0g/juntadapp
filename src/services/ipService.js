const constants = require("../util/constants.js");
const responseBuilder = require("../util/responseBuilder.js");

const Ip = require("../models/ipModel.js");

const findAllIps = async () => {
    console.log("findAllIps enter...");
    let res;
    
    try {
        let allIps = await Ip.findAll();
        res = responseBuilder.getOkResponse(constants.ENTIDADES_ENCONTRADAS, allIps);
    } catch (error) {
        console.error(error);
        res = responseBuilder.getBadResponse(constants.ENTIDADES_NO_ENCONTRADAS, error, 500);
    }
    
    console.log("findAllIps exit...");
    return res;
};

module.exports = {
    findAllIps
};
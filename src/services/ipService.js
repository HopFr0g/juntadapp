const constants = require("../util/constants.js");
const responseBuilder = require("../util/responseBuilder.js");

const Ip = require("../models/Ip.js");

const findAllIps = async () => {
    console.log("findAllIps enter...");
    let res;
    
    try {
        let allIps = await Ip.findAll({
            include: "reuniones"
        });
        res = responseBuilder.getOkResponse(constants.ENTIDADES_ENCONTRADAS, allIps);
    } catch (error) {
        console.error(error);
        res = responseBuilder.getBadResponse(error, 500);
    }
    
    console.log("findAllIps exit...");
    return res;
};

module.exports = {
    findAllIps
};
const constants = require("../util/constants.js");
const responseBuilder = require("../util/responseBuilder.js");

const Reunion = require("../models/Reunion.js");

const findAllReuniones = async () => {
    console.log("findAllReuniones enter...");
    let res;
    
    try {
        let allReuniones = await Reunion.findAll();
        res = responseBuilder.getOkResponse(constants.ENTIDADES_ENCONTRADAS, allReuniones);
    } catch (error) {
        console.error(error);
        res = responseBuilder.getBadResponse(constants.ENTIDADES_NO_ENCONTRADAS, error, 500);
    }
    
    console.log("findAllReuniones exit...");
    return res;
};

module.exports = {
    findAllReuniones
};
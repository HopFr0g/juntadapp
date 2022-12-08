const constants = require("../util/constants.js");
const responseBuilder = require("../util/responseBuilder.js");

const Reunion = require("../models/Reunion.js");

const findAllReuniones = async () => {
    console.log("findAllReuniones enter...");
    let res;
    
    try {
        let allReuniones = await Reunion.findAll({
            include: "ip",
            attributes: ["id", "hash", "nombre", "descripcion", "fechaCreacion"]
        });
        res = responseBuilder.getOkResponse(constants.ENTIDADES_ENCONTRADAS, allReuniones);
    } catch (error) {
        console.error(error);
        res = responseBuilder.getBadResponse(error, 500);
    }
    
    console.log("findAllReuniones exit...");
    return res;
};

const findReunionById = async id => {
    console.log("findReunionById enter...");
    let res;
    
    try {
        let reunion = await Reunion.findOne({
            include: "ip",
            attributes: ["id", "hash", "nombre", "descripcion", "fechaCreacion"],
            where: {
                id
            }
        });
        if (reunion == null)
            throw constants.ENTIDAD_NO_ENCONTRADA + id;
        res = responseBuilder.getOkResponse(constants.ENTIDAD_ENCONTRADA + id, reunion);
    } catch (error) {
        console.error(error);
        res = responseBuilder.getBadResponse(error, 500);
    }
    
    console.log("findReunionById exit...");
    return res;
};

module.exports = {
    findAllReuniones,
    findReunionById
};
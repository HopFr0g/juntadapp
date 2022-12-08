const constants = require("../util/constants.js");
const responseBuilder = require("../util/responseBuilder.js");
const hashGenerator = require("../util/hashGenerator.js");

const Reunion = require("../models/Reunion.js");
const Ip = require("../models/Ip.js");

/* ------------------------------------------------ Métodos privados: ------------------------------------------------ */

const checkUniqueHash = async hash => {
    try {
        let existingReunion = await Reunion.findOne({
            where: {
                hash
            }
        });
        return existingReunion == null;
    } catch (error) {
        throw error;
    }
};

const getIp = async ipAddress => {
    let idIp;
    
    try {
        // Intentar crear nueva instancia de "ip":
        let ip = await Ip.create({
            ipv4: ipAddress
        });
        
        idIp = ip.id;
    } catch (error) {
        // Si no se pudo crear la instancia, intentar obtener una "ip" existente:
        try {
            let ip = await Ip.findOne({
                where: {
                    ipv4: ipAddress
                }
            });
            
            idIp = ip.id;
        } catch (error) {
            throw error;
        }
    }
    
    return idIp;
};

/* ------------------------------------------------ Métodos públicos: ------------------------------------------------ */

const findAllReuniones = async () => {
    console.log("findAllReuniones enter...");
    let res;
    
    try {
        let allReuniones = await Reunion.findAll({
            attributes: ["id", "hash", "nombre", "descripcion", "fechaCreacion"],
            include: "ip"
        });
        
        res = responseBuilder.getOkResponse(constants.ENTIDADES_ENCONTRADAS, allReuniones);
    } catch (error) {
        console.error(error);
        res = responseBuilder.getBadResponse(error, 500);
    }
    
    console.log("findAllReuniones exit...");
    return res;
};

const findReunionById = async req => {
    console.log("findReunionById enter...");
    let res;
    
    try {
        let id = req.params.id;
        
        let reunion = await Reunion.findOne({
            attributes: ["id", "hash", "nombre", "descripcion", "fechaCreacion"],
            include: "ip",
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

const createReunion = async req => {
    console.log("createReunion enter...");
    let res;
    
    try {
        let requestIp = req.ip;
        let requestBody = req.body;
        let reunion = new Object();
        
        // Generar hash aleatorio para la reunion:
        let hash = await hashGenerator.getHash(32, checkUniqueHash);
        
        // Obtener instancia de "ip" de la base de datos:
        let idIp = await getIp(requestIp);
        
        // Crear instancia de "reunion" y persistirla:
        reunion.nombre = requestBody.nombre;
        reunion.descripcion = requestBody.descripcion;
        reunion.hash = hash;
        reunion.idIp = idIp;
        
        reunion = await Reunion.create(reunion);
        
        res = responseBuilder.getOkResponse(constants.GUARDADO_EXITOSO, reunion);
    } catch (error) {
        console.log(error);
        res = responseBuilder.getBadResponse(error, 500);
    }
    
    console.log("createReunion exit...");
    return res;
};

module.exports = {
    findAllReuniones,
    findReunionById,
    createReunion
};
const constants = require("../util/constants.js");
const hashGenerator = require("../util/hashGenerator.js");

const ipService = require("../services/ipService.js");

const Reunion = require("../models/Reunion.js");

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

const getIdIp = async direccion => {
    let ip;
    try {
        ip = await ipService.create({
            direccion
        });
    } catch (error) {
        try {
            ip = await ipService.findByDireccion(direccion);
        } catch (error) {
            throw error;
        }
    }
    return ip.id;
};

/* ------------------------------------------------ Métodos públicos: ------------------------------------------------ */

const findAll = async () => {
    try {
        let allReuniones = await Reunion.findAll({
            // attributes: [],
            include: ["ip"]
        });
        return allReuniones;
    } catch (error) {
        throw error;
    }
};

const findById = async id => {
    try {
        let reunion = await Reunion.findOne({
            // attributes: [],
            include: ["ip"],
            where: {
                id
            }
        });
        if (reunion == null)
            throw constants.ENTIDAD_NO_ENCONTRADA + id;
        return reunion;
    } catch (error) {
        throw error;
    }
};

const create = async (reunion, direccionIp) => {
    try {
        let idIp = await getIdIp(direccionIp);
        let hash = await hashGenerator.getHash(16, checkUniqueHash);
        
        reunion.idIp = idIp;
        reunion.hash = hash;
        
        reunion = await Reunion.create(reunion);
        
        return reunion;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    findAll,
    findById,
    create
};
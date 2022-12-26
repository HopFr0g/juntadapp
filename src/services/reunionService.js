const constants = require("../util/constants.js");
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

const getIdIp = async direccionIp => {
    try {
        let ip = await Ip.findOrCreate({
            where: {
                direccion: direccionIp
            },
            defaults: {
                direccion: direccionIp
            }
        });
        if (Array.isArray(ip))
            ip = ip[0];
        return ip.id;
    } catch (error) {
        throw error;
    }
};

/* ------------------------------------------------ Métodos públicos: ------------------------------------------------ */

const findAll = async () => {
    try {
        let allReuniones = await Reunion.findAll();
        return allReuniones;
    } catch (error) {
        throw error;
    }
};

const findById = async id => {
    try {
        let reunion = await Reunion.findOne({
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

const findByHash = async hash => {
    try {
        let reunion = await Reunion.findOne({
            include: ["meses"],
            where: {
                hash
            } 
        });
        if (reunion == null)
            throw constants.ENTIDAD_NO_ENCONTRADA + hash;
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
    findByHash,
    create
};
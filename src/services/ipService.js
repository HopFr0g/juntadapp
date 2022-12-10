const constants = require("../util/constants.js");

const Ip = require("../models/Ip.js");

/* ------------------------------------------------ Métodos públicos: ------------------------------------------------ */

const findAll = async () => {
    try {
        let allIps = await Ip.findAll({
            // attributes: [],
            include: ["reuniones"]
        });
        return allIps;
    } catch (error) {
        throw error;
    }
};

const findById = async id => {
    try {
        let ip = await Ip.findOne({
            // attributes: [],
            include: ["reuniones"],
            where: {
                id
            }
        });
        if (ip == null)
            throw constants.ENTIDAD_NO_ENCONTRADA + id;
        return ip;
    } catch (error) {
        throw error;
    }
};

const findByDireccion = async direccion => {
    try {
        let ip = await Ip.findOne({
            // attributes: [],
            // include: [],
            where: {
                direccion
            }
        });
        if (ip == null)
            throw constants.ENTIDAD_NO_ENCONTRADA + ipv4;
        return ip;
    } catch (error) {
        throw error;
    }
};

const create = async ip => {
    try {
        ip = await Ip.create(ip);
        return ip;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    findAll,
    findById,
    findByDireccion,
    create
};
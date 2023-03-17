const {InternalServerError, NotFoundError} = require("../errors/errors.js");
const constants = require("../util/constants.js");

const Ip = require("../models/Ip.js");

/* ---------------------------------------------------- Atributos: --------------------------------------------------- */

const service = "ipService: ";

/* ------------------------------------------------ Métodos públicos: ------------------------------------------------ */

const findAll = async () => {
    console.debug(service + "findAll enter...");
    let ips;
    try {
        ips = await Ip.findAll({
            include: {
                all: true,
                nested: true
            }
        });
        console.debug(ips.length + " entidades encontradas.");
    } catch (error) {
        console.error(error);
        throw new InternalServerError(error.message);
    }
    console.debug(service + "findAll exit.");
    return ips;
};

const findById = async id => {
    console.debug(service + "findById enter...");
    let ip;
    try {
        ip = await Ip.findOne({
            where: {
                id
            }
        });
        if (ip == null)
            throw new NotFoundError(constants.ENTIDAD_NO_ENCONTRADA + id);
    } catch (error) {
        console.error(error);
        if (error instanceof NotFoundError)
            throw error;
        throw new InternalServerError(error.message);
    }
    console.debug(service + "findById exit.");
    return ip;
};

const findByDireccion = async direccion => {
    console.debug(service + "findByDireccion enter...");
    let ip;
    try {
        ip = await Ip.findOne({
            where: {
                direccion
            }
        });
        if (ip == null)
            throw new NotFoundError(constants.ENTIDAD_NO_ENCONTRADA + direccion);
    } catch (error) {
        console.error(error);
        if (error instanceof NotFoundError)
            throw error;
        throw new InternalServerError(error.message);
    }
    console.debug(service + "findByDireccion exit.");
    return ip;
};

const create = async direccion => {
    console.debug(service + "create enter...");
    let ip;
    try {
        ip = await Ip.create({
            direccion
        });
    } catch (error) {
        console.error(error);
        throw new InternalServerError(error.message);
    }
    console.debug(service + "create exit.");
    return ip;
};

const findOrCreate = async (direccion, transaction) => {
    console.debug(service + "findOrCreate enter...");
    let ip;
    try {
        let [entity, created] = await Ip.findOrCreate({
            where: {
                direccion
            },
            transaction
        });
        console.debug(created ? "Nueva entidad creada." : "Entidad existente encontrada.");
        ip = entity;
    } catch (error) {
        console.error(error);
        throw new InternalServerError(error.message); 
    }
    console.debug(service + "findOrCreate exit.");
    return ip;
}

module.exports = {
    findAll,
    findById,
    findByDireccion,
    create,
    findOrCreate
};
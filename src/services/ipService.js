const {InternalServerError, NotFoundError} = require("../errors/errors.js");

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
    findOrCreate
};
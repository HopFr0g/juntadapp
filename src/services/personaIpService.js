const {InternalServerError} = require("../errors/errors.js");

const PersonaIp = require("../model/PersonaIp.js");

/* ---------------------------------------------------- Atributos: --------------------------------------------------- */

const service = "personaIpService: ";

/* ------------------------------------------------ Métodos públicos: ------------------------------------------------ */

const create = async (idPersona, idIp, transaction) => {
    console.debug(service + "create enter...");
    let personaIp;
    try {
        personaIp = await PersonaIp.create({
            idPersona,
            idIp
        }, {
            transaction
        });
    } catch (error) {
        console.error(error);
        throw new InternalServerError(error.message);
    }
    console.debug(service + "create exit.");
    return personaIp;
};

module.exports = {
    create
};
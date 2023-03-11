const {InternalServerError} = require("../errors/errors.js");

const PersonaFecha = require("../model/PersonaFecha.js");

/* ---------------------------------------------------- Atributos: --------------------------------------------------- */

const service = "personaFechaService: ";

/* ------------------------------------------------ Métodos públicos: ------------------------------------------------ */

const create = async (idPersona, idFecha, transaction) => {
    console.debug(service + "create enter...");
    let personaFecha;
    try {
        personaFecha = await PersonaFecha.create({
            idPersona,
            idFecha
        }, {
            transaction
        });
    } catch (error) {
        console.error(error);
        throw new InternalServerError(error.message);
    }
    console.debug(service + "create exit.");
    return personaFecha;
};

module.exports = {
    create
};
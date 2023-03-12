const {InternalServerError} = require("../errors/errors.js");

const ReunionMes = require("../models/ReunionMes.js");

/* ---------------------------------------------------- Atributos: --------------------------------------------------- */

const service = "reunionMesService: ";

/* ------------------------------------------------ Métodos públicos: ------------------------------------------------ */

const create = async (idReunion, idMes, transaction) => {
    console.debug(service + "create enter...");
    let reunionMes;
    try {
        reunionMes = await ReunionMes.create(
            {
                idReunion,
                idMes
            }, {
                transaction
            }
        );
    } catch (error) {
        console.error(error);
        throw new InternalServerError(error.message);
    }
    console.debug(service + "create exit.");
    return reunionMes;
};

module.exports = {
    create
};
const {InternalServerError} = require("../errors/errors.js");
const {queryFindCoincidencias} = require("../util/queries.js");

const Fecha = require("../models/Fecha.js");

const sequelize = require("../config/sequelize.js");

/* ---------------------------------------------------- Atributos: --------------------------------------------------- */

const service = "fechaService: ";

/* ------------------------------------------------ Métodos públicos: ------------------------------------------------ */

const findOrCreate = async (idMes, diaDelMes, transaction) => {
    console.debug(serviceName + "findOrCreate enter...")
    let fecha;
    try {
        let [entity, created] = await Fecha.findOrCreate({
            where: {
                idMes: idMes,
                diaDelMes: diaDelMes
            },
            transaction
        });
        console.debug(created ? "Nueva entidad creada." : "Entidad existente encontrada.");
        fecha = entity;
    } catch (error) {
        console.error(error);
        throw new InternalServerError(error.message); 
    }
    console.debug(service + "findOrCreate exit.")
    return fecha;
}

const findCoincidenciasByReunion = async reunionHash => {
    console.debug(service + "findCoincidenciasByReunion enter...");
    let fechas = null;
    try {
        fechas = await sequelize.query(
            queryFindCoincidencias,
            {
                type: sequelize.QueryTypes.SELECT,
                replacements: {
                    hash: reunionHash
                }
            }
        );
        console.debug(fechas.length + " entidades encontradas.");
    } catch (error) {
        console.error(error);
        throw new InternalServerError(error.message);
    }
    console.debug(service + "findCoincidenciasByReunion exit.");
    return fechas;
}

module.exports = {
    findOrCreate,
    findCoincidenciasByReunion
};
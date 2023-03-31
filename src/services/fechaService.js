const {InternalServerError} = require("../errors/errors.js");
const queries = require("../util/queries.js");

const Fecha = require("../models/Fecha.js");

const sequelize = require("../config/sequelize.js");

/* ---------------------------------------------------- Atributos: --------------------------------------------------- */

const service = "fechaService: ";

/* ------------------------------------------------ Métodos públicos: ------------------------------------------------ */

const findOrCreate = async (idMes, diaDelMes, transaction) => {
    console.debug(service + "findOrCreate enter...")
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

const findCoincidenciasByReunion = async (reunionHash, idPersonas) => {
    console.debug(service + "findCoincidenciasByReunion enter...");
    let fechas = null;
    try {
        fechas = await sequelize.query(
            // Sequelize no realiza el mapeo de las tuplas devueltas por esta query al modelo Fecha automáticamente, ya que no se definió la setting "model: Fecha" ni "mapToModel: true".
            // En su lugar, la query SQL le da un alias a cada elemento donde se usa un "." para definir cuáles atributos pertenecen a un objeto anidado (nested object).
            // Para que esto funcione se necesita del paquete "dottie" y definir la setting "nest: true" aquí.
            await queries.getQueryFindByCoincidencias(),
            {
                replacements: {
                    reunionHash,
                    idPersonas
                },
                type: sequelize.QueryTypes.SELECT,
                nest: true
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

const findCoincidenciasDiariasByReunion = async reunionHash => {
    console.debug(service + "findCoincidenciasDiariasByReunion enter...");
    let fechas = null;
    try {
        fechas = await sequelize.query(
            await queries.getQueryFindCoincidenciasDiarias(),
            {
                replacements: {
                    reunionHash
                },
                type: sequelize.QueryTypes.SELECT,
                nest: true
            }
        );
        console.debug(fechas.length + " entidades encontradas.");
    } catch (error) {
        console.error(error);
        throw new InternalServerError(error.message);
    }
    console.debug(service + "findCoincidenciasDiariasByReunion exit.");
    return fechas;
}

module.exports = {
    findOrCreate,
    findCoincidenciasByReunion,
    findCoincidenciasDiariasByReunion
};
const sequelize = require("../config/sequelize.js");

const {InternalServerError, NotFoundError} = require("../errors/errors.js");
const constants = require("../util/constants.js");

const Persona = require("../models/Persona.js");

const ipService = require("../services/ipService.js");
const personaIpService = require("../services/personaIpService.js");
const fechaService = require("../services/fechaService.js");
const personaFechaService = require("../services/personaFechaService.js");
const reunionService = require("../services/reunionService.js");

/* ---------------------------------------------------- Atributos: --------------------------------------------------- */

const service = "personaService: ";

/* ------------------------------------------------ Métodos públicos: ------------------------------------------------ */

const findAll = async () => {
    console.debug(service + "findAll enter...");
    let personas;
    try {
        personas = await Persona.findAll();
        console.debug(personas.length + " entidades encontradas.");
    } catch (error) {
        console.error(error);
        throw new InternalServerError(error.message);
    }
    console.debug(service + "findAll exit.");
    return personas;
};

const findAllByHash = async reunionHash => {
    console.debug(service + "findAllByHash enter...");
    let personas;
    try {
        let reunion = await reunionService.findByHash(reunionHash);
        personas = await Persona.findAll({
            include: ["personaFechas"],
            where: {
                idReunion: reunion.id
            }
        });
        console.debug(personas.length + " entidades encontradas.");
    } catch (error) {
        console.error(error);
        throw new InternalServerError(error.message);
    }
    console.debug(service + "findAllByHash exit.");
    return personas;
};

const findById = async id => {
    console.debug(service + "findById enter...");
    let persona;
    try {
        persona = await Persona.findOne({
            where: {
                id
            }
        });
        if (persona == null)
            throw new NotFoundError(constants.ENTIDAD_NO_ENCONTRADA + id);
    } catch (error) {
        console.error(error);
        if (error instanceof NotFoundError)
            throw error;
        throw new InternalServerError(error.message);
    }
    console.debug(service + "findById exit.");
    return persona;
};

const create = async (nombre, meses, reunionHash, direccionIp) => {
    console.debug(service + "create enter...");
    let persona;
    let transaction = await sequelize.transaction();
    try {
        let ip = await ipService.findOrCreate(direccionIp, transaction);
        let reunion = await reunionService.findByHash(reunionHash);
        let fechas = new Array();
        for (let mes of meses) {
            for (let dia of mes.dias) {
                let fecha = await fechaService.findOrCreate(mes.idMes, dia, transaction);
                fechas.push(fecha);
            }
        }
        persona = await Persona.create(
            {
                idReunion: reunion.id,
                nombre
            }, {
                transaction
            }
        );
        await personaIpService.create(persona.id, ip.id, transaction);
        for (let fecha of fechas)
            await personaFechaService.create(persona.id, fecha.id, transaction);
        
        await transaction.commit();
    } catch (error) {
        await transaction.rollback();
        console.error(error);
        throw new InternalServerError(error.message);
    }
    console.debug(service + "create exit.");
    return persona;
};

module.exports = {
    findAll,
    findAllByHash,
    findById,
    create
};
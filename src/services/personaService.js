const sequelize = require("../config/sequelize.js");

const {InternalServerError} = require("../errors/errors.js");

const Persona = require("../models/Persona.js");

const ipService = require("../services/ipService.js");
const personaIpService = require("../services/personaIpService.js");
const fechaService = require("../services/fechaService.js");
const personaFechaService = require("../services/personaFechaService.js");
const reunionService = require("../services/reunionService.js");

const PersonaFecha = require("../models/PersonaFecha.js");
const Fecha = require("../models/Fecha.js");
const Mes = require("../models/Mes.js");

/* ---------------------------------------------------- Atributos: --------------------------------------------------- */

const service = "personaService: ";

/* ------------------------------------------------ Métodos públicos: ------------------------------------------------ */

const findAllByHash = async reunionHash => {
    console.debug(service + "findAllByHash enter...");
    let personas;
    try {
        let reunion = await reunionService.findByHash(reunionHash);
        personas = await Persona.findAll({
            include: [
                {
                    model: PersonaFecha,
                    as: "personaFecha",
                    include: [
                        {
                            model: Fecha,
                            as: "fecha",
                            include: [
                                {
                                    model: Mes,
                                    as: "mes"
                                }
                            ]
                        }
                    ]
                }
            ],
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
    findAllByHash,
    create
};
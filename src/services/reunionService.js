const crypto = require("crypto");

const {InternalServerError, NotFoundError} = require("../errors/errors.js");
const constants = require("../util/constants.js");

const Reunion = require("../models/Reunion.js");

const ipService = require("../services/ipService.js");
const reunionMesService = require("../services/reunionMesService.js");

const sequelize = require("../config/sequelize.js");

const ReunionMes = require("../models/ReunionMes.js");
const Mes = require("../models/Mes.js");
const Persona = require("../models/Persona.js");

/* ---------------------------------------------------- Atributos: --------------------------------------------------- */

const service = "reunionService: ";

/* ------------------------------------------------ Métodos privados: ------------------------------------------------ */

const checkUniqueHash = async hash => {
    console.debug(service + "checkUniqueHash enter...");
    let disponible;
    try {
        let existingReunion = await Reunion.findOne({
            where: {
                hash
            }
        });
        disponible = (existingReunion == null);
    } catch (error) {
        console.error(error);
        throw new InternalServerError(error.message);
    }
    console.debug(service + "checkUniqueHash exit.");
    return disponible;
};

const createHash = async length => {
    console.debug(service + "createHash enter...");
    let hash;
    let checked = false;
    while (!checked) {
        hash = crypto.randomBytes(length / 2).toString('hex');
        checked = await checkUniqueHash(hash);
    }  
    console.debug(service + "createHash exit.");
    return hash;
};

/* ------------------------------------------------ Métodos públicos: ------------------------------------------------ */

const findByHash = async hash => {
    console.debug(service + "findByHash enter...");
    let reunion;
    try {
        reunion = await Reunion.findOne({
            include: [
                {
                    model: ReunionMes,
                    as: "reunionMes",
                    include: [
                        {
                            model: Mes,
                            as: "mes"
                        }
                    ]
                }, {
                    model: Persona,
                    as: "persona"
                }
            ],
            where: {
                hash
            }
        });
        if (reunion == null)
            throw new NotFoundError(constants.ENTIDAD_NO_ENCONTRADA + hash);
    } catch (error) {
        console.error(error);
        if (error instanceof NotFoundError)
            throw error;
        throw new InternalServerError(error.message);
    }
    console.debug(service + "findByHash exit.");
    return reunion;
};

const create = async (nombre, descripcion, idMeses, direccionIp) => {
    console.debug(service + "create enter...");
    let reunion;
    let transaction = await sequelize.transaction();
    try {
        let ip = await ipService.findOrCreate(direccionIp, transaction);
        let hash = await createHash(constants.DIMENSION_HASH);
        reunion = await Reunion.create(
            {
                idIp: ip.id,
                hash,
                nombre,
                descripcion
            }, {
                transaction
            }
        );
        for (let idMes of idMeses)
            await reunionMesService.create(reunion.id, idMes, transaction);
        await transaction.commit();
    } catch (error) {
        await transaction.rollback();
        console.error(error);
        throw new InternalServerError(error.message);
    }
    console.debug(service + "create exit.");
    return reunion;
};

module.exports = {
    findByHash,
    create
};
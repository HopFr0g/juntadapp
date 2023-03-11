const crypto = require("crypto");

const {InternalServerError, NotFoundError} = require("../errors/errors.js");
const constants = require("../util/constants.js");

const Reunion = require("../models/Reunion.js");

const ipService = require("../services/ipService.js");
// TODO: Agregar relación entre reunion y meses al crear reunion

const sequelize = require("../config/sequelize.js");

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

const findAll = async () => {
    console.debug(service + "findAll enter...");
    let reuniones;
    try {
        reuniones = await Reunion.findAll();
        console.debug(reuniones.length + " entidades encontradas.");
    } catch (error) {
        console.error(error);
        throw new InternalServerError(error.message);
    }
    console.debug(service + "findAll exit.");
    return reuniones;
};

const findById = async id => {
    console.debug(service + "findById enter...");
    let reunion;
    try {
        reunion = await Reunion.findOne({
            where: {
                id
            }
        });
        if (reunion == null)
            throw new NotFoundError(constants.ENTIDAD_NO_ENCONTRADA + id);
    } catch (error) {
        console.error(error);
        if (error instanceof NotFoundError)
            throw error;
        throw new InternalServerError(error.message);
    }
    console.debug(service + "findById exit.");
    return reunion;
};

const findByHash = async hash => {
    console.debug(service + "findByHash enter...");
    let reunion;
    try {
        reunion = await Reunion.findOne({
            include: ["meses"],
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

const create = async (nombre, descripcion, direccionIp) => {
    console.debug(service + "create enter...");
    let reunion;
    let transaction = await sequelize.transaction();
    try {
        let ip = await ipService.findOrCreate(direccionIp, transaction);
        let hash = await createHash(16);
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
    findAll,
    findById,
    findByHash,
    create
};
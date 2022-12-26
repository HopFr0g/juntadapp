const sequelize = require("../config/sequelize.js");

const constants = require("../util/constants.js");

const Persona = require("../models/Persona.js");
const Ip = require("../models/Ip.js");
const Reunion = require("../models/Reunion.js");
const PersonaIp = require("../models/PersonaIp.js");

/* ------------------------------------------------ Métodos privados: ------------------------------------------------ */

const getIdReunion = async reunionHash => {
    try {
        let reunion = await Reunion.findOne({
            where: {
                hash: reunionHash
            }
        });
        if (reunion == null)
            throw constants.ENTIDAD_NO_ENCONTRADA + reunionHash;
        return reunion.id;
    } catch (error) {
        throw error;
    }
}

const getIdIp = async direccionIp => {
    try {
        let ip = await Ip.findOrCreate({
            where: {
                direccion: direccionIp
            },
            defaults: {
                direccion: direccionIp
            }
        });
        if (Array.isArray(ip))
            ip = ip[0];
        return ip.id;
    } catch (error) {
        throw error;
    }
};

/* ------------------------------------------------ Métodos públicos: ------------------------------------------------ */

const findAll = async () => {
    try {
        let allPersonas = await Persona.findAll();
        return allPersonas;
    } catch (error) {
        throw error;
    }
};

const findAllByHash = async reunionHash => {
    try {
        let idReunion = await getIdReunion(reunionHash);
        let allPersonas = await Persona.findAll({
            include: ["meses"],
            where: {
                idReunion
            }
        });
        return allPersonas;
    } catch (error) {
        throw error;
    }
};

const findById = async id => {
    try {
        let persona = await Persona.findOne({
            where: {
                id
            }
        });
        if (persona == null)
            throw constants.ENTIDAD_NO_ENCONTRADA + id;
        return persona;
    } catch (error) {
        throw error;
    }
};

const create = async (persona, reunionHash, direccionIp) => {
    let transaction = await sequelize.transaction();
    
    try {
        let idIp = await getIdIp(direccionIp);
        let idReunion = await getIdReunion(reunionHash);
        persona.idReunion = idReunion;
            
        persona = await Persona.create(
            persona,
            {
                transaction
            }
        );
        
        let personaIp = {
            idPersona: persona.id,
            idIp: idIp
        };
        
        await PersonaIp.create(
            personaIp,
            {
                transaction
            }
        );
        
        await transaction.commit();
        return persona;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

module.exports = {
    findAll,
    findAllByHash,
    findById,
    create
};
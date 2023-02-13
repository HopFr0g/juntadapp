const sequelize = require("../config/sequelize.js");

const constants = require("../util/constants.js");

const Persona = require("../models/Persona.js");
const Ip = require("../models/Ip.js");
const Reunion = require("../models/Reunion.js");
const PersonaIp = require("../models/PersonaIp.js");
const PersonaFecha = require("../models/PersonaFecha.js");
const Fecha = require("../models/Fecha.js");

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

const getIdFecha = async (idMes, diaDelMes) => {
    try {
        let fecha = await Fecha.findOrCreate({
            where: {
                idMes: idMes,
                diaDelMes: diaDelMes
            }
        });
        if (Array.isArray(fecha))
            fecha = fecha[0];
        return fecha.id;
    } catch (error) {
        throw error;
    }
}

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

const create = async (persona, reunionHash, direccionIp, meses) => {
    let transaction = await sequelize.transaction();
    
    try {
        // Obtención de ids de entidades asociadas:
        let idIp = await getIdIp(direccionIp);
        let idReunion = await getIdReunion(reunionHash);
        let idFechas = new Array();
        for (let mes of meses) {
            for (let dia of mes.dias) {
                let idFecha = await getIdFecha(mes.idMes, dia);
                idFechas.push(idFecha);
            }
        }
        
        // Creación de la persona:
        persona.idReunion = idReunion;
        persona = await Persona.create(
            persona,
            {
                transaction
            }
        );
        
        // Creación de la persona_ip:
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
        
        // Creación de las persona_fechas:
        for (let idFecha of idFechas) {
            let personaFecha = {
                idPersona: persona.id,
                idFecha: idFecha
            }
            await PersonaFecha.create(
                personaFecha,
                {
                    transaction
                }
            );
        }
        
        // Si no se lanzaron errores, comitear transacción y devolver:
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
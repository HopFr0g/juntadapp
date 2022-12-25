const Sequelize = require("sequelize");
const sequelize = require("../config/sequelize.js");

const Persona = require("./Persona.js");
const Ip = require("./Ip.js");

const PersonaIp = sequelize.define(
    "persona_ip",
    {
        id: {
            field: "id",
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        idPersona: {
            field: "id_persona",
            type: Sequelize.INTEGER,
            allowNull: false,
            unique: "ak",
            references: {
                model: "Persona",
                key: "id"
            }
        },
        idIp: {
            field: "id_ip",
            type: Sequelize.INTEGER,
            allowNull: false,
            unique: "ak",
            references: {
                model: "Ip",
                key: "id"
            }
        },
        fecha: {
            field: "fecha",
            type: Sequelize.TEXT,
            unique: "ak"
        }
    },
    {
        timestamps: false,
        freezeTableName: true,
        tableName: "persona_ip"
    }
);

PersonaIp.belongsTo(
    Persona,
    {
        foreignKey: "idPersona",
        foreignKeyConstraint: true
    }
);

Persona.hasMany(
    PersonaIp,
    {
        foreignKey: "idPersona",
        as: "personasIps"
    }
);

PersonaIp.belongsTo(
    Ip,
    {
        foreignKey: "idIp",
        foreignKeyConstraint: true
    }
);

Ip.hasMany(
    PersonaIp,
    {
        foreignKey: "idIp",
        as: "personas"
    }
);

module.exports = PersonaIp;
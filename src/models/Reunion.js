const Sequelize = require("sequelize");
const sequelize = require("../config/sequelize.js");

const Persona = require("./Persona.js");
const ReunionMes = require("./ReunionMes.js");

const Reunion = sequelize.define(
    "reunion",
    {
        id: {
            field: "id",
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        idIp: {
            field: "id_ip",
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: "Ip",
                key: "id"
            }
        },
        hash: {
            field: "hash",
            type: Sequelize.STRING(32),
            allowNull: false,
            unique: true
        },
        nombre: {
            field: "nombre",
            type: Sequelize.STRING(64),
            allowNull: false
        },
        descripcion: {
            field: "descripcion",
            type: Sequelize.STRING(128)
        },
        fechaCreacion: {
            field: "fecha_creacion",
            type: Sequelize.TEXT
        }
    },
    {
        timestamps: false,
        freezeTableName: true,
        tableName: "reunion"
    }
);

Reunion.hasMany(
    Persona,
    {
        as: "persona",
        foreignKey: "idReunion"
    }
);

Reunion.hasMany(
    ReunionMes,
    {
        as: "reunionMes",
        foreignKey: "idReunion"
    }
);

module.exports = Reunion;
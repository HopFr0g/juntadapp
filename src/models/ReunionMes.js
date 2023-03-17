const Sequelize = require("sequelize");
const sequelize = require("../config/sequelize.js");

const Mes = require("./Mes.js");

const ReunionMes = sequelize.define(
    "reunion_mes",
    {
        id: {
            field: "id",
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        idReunion: {
            field: "id_reunion",
            type: Sequelize.INTEGER,
            allowNull: false,
            unique: "ak",
            references: {
                model: "Reunion",
                key: "id"
            }
        },
        idMes: {
            field: "id_mes",
            type: Sequelize.INTEGER,
            allowNull: false,
            unique: "ak",
            references: {
                model: "Mes",
                key: "id"
            }
        }
    },
    {
        timestamps: false,
        freezeTableName: true,
        tableName: "reunion_mes"
    }
);

ReunionMes.belongsTo(
    Mes,
    {
        as: "mes",
        foreignKey: "idMes"
    }
);

module.exports = ReunionMes;
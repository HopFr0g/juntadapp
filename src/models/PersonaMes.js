const Sequelize = require("sequelize");
const sequelize = require("../config/sequelize.js");

const Mes = require("./Mes.js");

const PersonaMes = sequelize.define(
    "persona_mes",
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
        idMes: {
            field: "id_mes",
            type: Sequelize.INTEGER,
            allowNull: false,
            unique: "ak",
            references: {
                model: "Mes",
                key: "id"
            }
        },
        diaDelMes: {
            field: "dia_del_mes",
            type: Sequelize.INTEGER,
            allowNull: false,
            unique: "ak"
        }
    },
    {
        timestamps: false,
        freezeTableName: true,
        tableName: "persona_mes"
    }
);

PersonaMes.belongsTo(
    Mes,
    {
        foreignKey: "idMes",
        foreignKeyConstraint: true
    }
);

Mes.hasMany(
    PersonaMes,
    {
        foreignKey: "idMes",
        as: "personas"
    }
);

module.exports = PersonaMes;
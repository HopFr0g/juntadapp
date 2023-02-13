const Sequelize = require("sequelize");
const sequelize = require("../config/sequelize.js");

const Fecha = sequelize.define(
    "fecha",
    {
        id: {
            field: "id",
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
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
            unique: "ak",
            validate: {
                min: 1,
                max: 31
            }
        }
    },
    {
        timestamps: false,
        freezeTableName: true,
        tableName: "fecha"
    }
);

module.exports = Fecha;
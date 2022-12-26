const Sequelize = require("sequelize");
const sequelize = require("../config/sequelize.js");

const Mes = sequelize.define(
    "mes",
    {
        id: {
            field: "id",
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        mes: {
            field: "mes",
            type: Sequelize.INTEGER,
            allowNull: false,
            unique: "ak"
        },
        anio: {
            field: "anio",
            type: Sequelize.INTEGER,
            allowNull: false,
            unique: "ak"
        }
    },
    {
        timestamps: false,
        freezeTableName: true,
        tableName: "mes"
    }
);

module.exports = Mes;
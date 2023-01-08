const Sequelize = require("sequelize");
const sequelize = require("../config/sequelize.js");

const Ip = sequelize.define(
    "ip",
    {
        id: {
            field: "id",
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        direccion: {
            field: "direccion",
            type: Sequelize.STRING(15),
            allowNull: false,
            unique: true,
            validate: {
                isIPv4: true
            }
        }
    },
    {
        timestamps: false,
        freezeTableName: true,
        tableName: "ip"
    }
);

module.exports = Ip;
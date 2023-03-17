const Sequelize = require("sequelize");
const sequelize = require("../config/sequelize.js");

const Reunion = require("./Reunion.js");
const PersonaIp = require("./PersonaIp.js");

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

Ip.hasMany(
    Reunion,
    {
        foreignKey: "idIp",
        as: "reunion"
    }
);

module.exports = Ip;
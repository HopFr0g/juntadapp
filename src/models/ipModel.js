const Sequelize = require("sequelize");
const sequelize = require("../config/sequelize.js");

const Ip = sequelize.define(
    "ip", 
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        ipv4: {
            type: Sequelize.STRING(15),
            allowNull: false
        }
    },
    {
        timestamps: false,
        freezeTableName: true,
        tableName: "ip"
    }
);

module.exports = Ip;
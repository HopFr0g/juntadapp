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
        ipv4: {
            field: "ipv4",
            type: Sequelize.STRING(15),
            allowNull: false,
            unique: true
        }
    },
    {
        timestamps: false,
        freezeTableName: true,
        tableName: "ip"
    }
);

module.exports = Ip;
const Sequelize = require("sequelize");
const sequelize = require("../config/sequelize.js");

const Fecha = require("./Fecha.js");

const PersonaFecha = sequelize.define(
    "persona_fecha",
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
        idFecha: {
            field: "id_fecha",
            type: Sequelize.INTEGER,
            allowNull: false,
            unique: "ak",
            references: {
                model: "Fecha",
                key: "id"
            }
        }
    },
    {
        timestamps: false,
        freezeTableName: true,
        tableName: "persona_fecha"
    }
);

PersonaFecha.belongsTo(
    Fecha,
    {
        as: "fecha",
        foreignKey: "idFecha"
    }
)

module.exports = PersonaFecha;
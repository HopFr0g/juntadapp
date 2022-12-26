const Sequelize = require("sequelize");
const sequelize = require("../config/sequelize.js");

const Reunion = require("./Reunion.js");
const PersonaMes = require("./PersonaMes.js");

const Persona = sequelize.define(
    "persona",
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
        nombre: {
            field: "nombre",
            type: Sequelize.STRING(32),
            allowNull: false,
            unique: "ak"
        },
        fechaCreacion: {
            field: "fecha_creacion",
            type: Sequelize.TEXT
        }
    },
    {
        timestamps: false,
        freezeTableName: true,
        tableName: "persona"
    }
);

Persona.belongsTo(
    Reunion,
    {
        foreignKey: "idReunion",
        foreignKeyConstraint: true
    }
);

Reunion.hasMany(
    Persona,
    {
        foreignKey: "idReunion",
        as: "personas"
    }
);

PersonaMes.belongsTo(
    Persona,
    {
        foreignKey: "idPersona",
        foreignKeyConstraint: true
    }
);

Persona.hasMany(
    PersonaMes,
    {
        foreignKey: "idPersona",
        as: "meses"
    }
);

module.exports = Persona;
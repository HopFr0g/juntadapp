const Sequelize = require("sequelize");

const dbConfig = {
    dialect: "sqlite",
    storage: __dirname + "..\\..\\..\\database\\juntadapp.db"
};

const sequelize = new Sequelize(dbConfig);

module.exports = sequelize;
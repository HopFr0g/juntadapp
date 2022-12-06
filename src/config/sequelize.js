const Sequelize = require("sequelize");

const dbConfig = {
    dialect: "sqlite",
    storage: "C:\\Users\\polet\\Desktop\\JuntadAPP\\03_Implementacion\\juntadapp\\database\\juntadapp.db",
    logQueryParameters: true,
    benchmark: true
};

const sequelize = new Sequelize(dbConfig);

module.exports = sequelize;
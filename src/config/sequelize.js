const Sequelize = require("sequelize");

const dbConfig = {
    // benchmark: true,
    // logQueryParameters: true,
    dialect: "sqlite",
    storage: "C:\\Users\\polet\\Desktop\\JuntadAPP\\03_Implementacion\\juntadapp\\database\\juntadapp.db"
};

const sequelize = new Sequelize(dbConfig);

module.exports = sequelize;
const fs = require("fs");

const {InternalServerError} = require("../errors/errors.js");

/* ---------------------------------------------------- Atributos: --------------------------------------------------- */

let queryFindByCoincidencias = null;

/* ------------------------------------------------ Métodos privados: ------------------------------------------------ */

const getQueryFromFile = fileName => {
    const filePath = __dirname + "\\..\\queries\\" + fileName;
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, {
            encoding: "utf-8"
        }, (error, data) => {
            if (error)
                return reject(error);
            return resolve(data.toString());
        });
    });
};

/* ------------------------------------------------ Métodos públicos: ------------------------------------------------ */

const getQueryFindByCoincidencias = async () => {
    console.debug("getQueryFindByCoincidencias enter...");
    try {
        const fileName = "findByCoincidencias.sql";
        if (queryFindByCoincidencias == null)
            queryFindByCoincidencias = await getQueryFromFile(fileName);
    } catch (error) {
        console.error(error);
        throw new InternalServerError(error.message);
    }
    console.debug("getQueryFindByCoincidencias exit.");
    return queryFindByCoincidencias;
};

module.exports = {
    getQueryFindByCoincidencias
}
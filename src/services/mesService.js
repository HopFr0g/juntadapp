const {InternalServerError} = require("../errors/errors.js");

const Mes = require("../models/Mes.js");

/* ---------------------------------------------------- Atributos: --------------------------------------------------- */

const service = "mesService: ";

/* ------------------------------------------------ Métodos públicos: ------------------------------------------------ */

const findAllProximos = async () => {
    console.debug(service + "findAllProximos enter...");
    let meses;
    try {
        meses = [];
        const fechaActual = new Date();
        let mesActual = fechaActual.getMonth() + 1;
        let anioActual = fechaActual.getFullYear();
        for (let i = 0; i < 6; ++i) {
            let mes = mesActual + i;
            let anio = anioActual;
            if (mes > 12) {
                mes -= 12;
                anio += 1;
            }
            [mesEntity, mesCreated] = await Mes.findOrCreate({
                where: {
                    mes,
                    anio
                }
            });
            if (mesCreated)
                log.debug("Se ha creado el mes: " + mes + ", anio: " + anio);
            meses.push(mesEntity);
        }
    } catch (error) {
        console.error(error);
        throw new InternalServerError(error.message);
    }
    console.debug(service + "findAllProximos exit...");
    return meses;
}

module.exports = {
    findAllProximos
}
const sequelize = require("./config/sequelize.js");

const express = require("express");
const app = express();

/* ---------------------------------------------------------------------------
|                                                                            |
|        Import de "routes" (endpoints definidos para la aplicación):        |
|                                                                            |
--------------------------------------------------------------------------- */

const ipRoutes = require("./routes/ipRoutes.js");

app.use("/api/ip", ipRoutes);

/* ---------------------------------------------------------------------------
|                                                                            |
|                      Express settings y middlewares:                       |
|                                                                            |
----------------------------------------------------------------------------*/



/* ---------------------------------------------------------------------------
|                                                                            |
|                   Inicialización de Express y Sequelize:                   |
|                                                                            |
--------------------------------------------------------------------------- */

const main = async () => {
    // Sincronizar sequelize con BD:
    try {
        await sequelize.sync();
        console.log("App sincronizada con la DB exitosamente.");
    } catch (error) {
        console.error(`Error al sincronizar App con la BD: ${error}`);
    }
    
    // Poner puerto a la escucha de las requests entrantes:
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`App iniciada en el puerto ${PORT}.`);
    });
}

main();
const sequelize = require("./config/sequelize.js");

const express = require("express");
const app = express();

const cors = require("cors");

/* ---------------------------------------------------------------------------
|                      Express settings y middlewares:                       |
----------------------------------------------------------------------------*/

// Filtro CORS (Para servidores públicos):
app.use(cors({origin: "*"}));

// Acceder al body de la request:
app.use(express.json());

// Acceder a la IP de la request:
app.set("trust proxy", true);

/* ---------------------------------------------------------------------------
|        Import de "routes" (endpoints definidos para la aplicación):        |
--------------------------------------------------------------------------- */

app.use("/api/ip", require("./routes/ipRoutes.js"));
app.use("/api/reunion", require("./routes/reunionRoutes"));

/* ---------------------------------------------------------------------------
|                   Inicialización de Express y Sequelize:                   |
--------------------------------------------------------------------------- */

const main = async () => {
    // Sincronizar sequelize con BD:
    try {
        await sequelize.sync({
            force: false
        });
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
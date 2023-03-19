const enviroment = require("./config/enviroment.js");
const sequelize = require("./config/sequelize.js");

const express = require("express");
const app = express();

const cors = require("cors");

/* ---------------------------------------------------------------------------
|                                Swagger UI:                                 |
----------------------------------------------------------------------------*/

const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const swaggerConfig = require("./config/swaggerConfig.js");

/* ---------------------------------------------------------------------------
|                      Express settings y middlewares:                       |
----------------------------------------------------------------------------*/

// Acceder a la IP de la request:
app.set("trust proxy", true);

// Filtro CORS (Para servidores públicos):
app.use(cors({origin: "*"}));

// Acceder al body de la request:
app.use(express.json());

// Swagger:
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerJsDoc(swaggerConfig)));

/* ---------------------------------------------------------------------------
|        Import de "routes" (endpoints definidos para la aplicación):        |
--------------------------------------------------------------------------- */

app.use("/api/ip", require("./routes/ipRoutes.js"));
app.use("/api/reunion", require("./routes/reunionRoutes.js"));
app.use("/api/persona", require("./routes/personaRoutes.js"));
app.use("/api/fecha", require("./routes/fechaRoutes.js"));
app.use("/api/mes", require("./routes/mesRoutes.js"));

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
    const port = enviroment.port;
    if (port == null)
        throw new Error("Debe definir un puerto en el archivo de variables de entorno.");
    app.listen(port, () => {
        console.log(`App iniciada en el puerto ${port}.`);
    });
}

main();
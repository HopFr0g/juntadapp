const express = require("express");
const app = express();

// Cargar modelos de sequelize y sincronizar ORM con la BD:

const db = require("./models");

db.sequelize.sync()
    .then(() => {
        console.log("App sincronizada con la BD exitosamente.");
    })
    .catch((err) => {
        console.log("Error al sincronizar app con la BD: " + err.message);
    });

// Inicializar puerto a la escucha de requests HTTP entrantes:

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`App iniciada en el puerto ${PORT}`);
});

// Rutas:

require("./routes/ip.routes")(app);
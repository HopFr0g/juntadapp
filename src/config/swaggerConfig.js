const path = require("path");

const swaggerConfig = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "JuntadAPP REST API",
            description: "Aplicación web para organizar días de reunión",
            contact: {
                name: "Leonel Poletti",
                url: "https://leonelpoletti.glitch.me",
                email: "poletti.leonel@gmail.com"
            },
            version: "1.0.0"
        },
        servers: [
            {
                url: "http://localhost:3000"
            }
        ]
    },
    apis: [
        `${path.join(__dirname, "../routes/*.js")}`
    ]
};

module.exports = swaggerConfig;
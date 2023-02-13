const path = require("path");

const swaggerConfig = {
    "definition": {
        "openapi": "3.0.0",
        "info": {
            "title": "JuntadAPP REST API",
            "description": "Aplicación web para organizar días de reunión",
            "contact": {
                "name": "Leonel Poletti",
                "url": "https://leonelpoletti.glitch.me",
                "email": "poletti.leonel@gmail.com"
            },
            "version": "1.0.0"
        },
        "servers": [
            {
                "url": "http://localhost:3000"
            }
        ],
        "components": {
            "schemas": {
                "BaseResponse": {
                    "type": "object",
                    "properties": {
                        "ok": {
                            "type": "boolean"
                        },
                        "status": {
                            "type": "integer",
                            "format": "int32"
                        },
                        "message": {
                            "type": "string"
                        },
                        "elements": {
                            "type": "array",
                            "items": {
                                "type": "object"
                            }
                        },
                        "size": {
                            "type": "integer",
                            "format": "int32"
                        }
                    }
                },
                "Reunion": {
                    "type": "object",
                    "properties": {
                        "nombre": {
                            "type": "string",
                            "required": "true"
                        },
                        "descripcion": {
                            "type": "string",
                            "required": "false"
                        }
                    }
                },
                "Persona": {
                    "type": "object",
                    "properties": {
                        "reunionHash": {
                            "type": "string",
                            "required": "true"
                        },
                        "nombre": {
                            "type": "string",
                            "required": "true"
                        },
                        "meses": {
                            "type": "array",
                            "items": {
                                "type": "object",
                                "$ref": "#/components/schemas/PersonaFecha"
                            }
                        }
                    }
                },
                "PersonaFecha": {
                    "type": "object",
                    "properties": {
                        "idMes": {
                            "type": "integer",
                            "format": "int32"
                        },
                        "dias": {
                            "type": "array",
                            "items": {
                                "type": "integer",
                                "format": "int32"
                            }
                        }
                    }
                },
                "Fecha": {
                    "type": "object",
                    "properties": {
                        "id": {
                            "type": "integer",
                            "format": "int32"
                        },
                        "idMes": {
                            "type": "integer",
                            "format": "int32"
                        },
                        "diaDelMes": {
                            "type": "integer",
                            "format": "int32"
                        }
                    }
                }
            },
            "responses": {
                "default": {
                    "description": "Respuesta por defecto, para cualquier estado.",
                    "content": {
                        "application/json": {
                            "schema": {
                                "type": "object",
                                "$ref": "#/components/schemas/BaseResponse"
                            }
                        }
                    }
                }
            }
        }
    },
    "apis": [
        `${path.join(__dirname, "../routes/*.js")}`
    ]
};

module.exports = swaggerConfig;
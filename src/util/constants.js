const constants = {
    // Códigos de estado:
    ESTADO_OK: 200,
    ESTADO_ERROR_INTERNO: 500,
    ESTADO_ERROR_CLIENTE: 422,
    // Mensajes generales:
    ENTIDAD_ENCONTRADA: "Entidad obtenida con éxito. ID: ",
    ENTIDADES_ENCONTRADAS: "Entidades obtenidas con éxito.",
    ENTIDAD_NO_ENCONTRADA: "No se encontró la entidad con ID: ",
    ENTIDADES_NO_ENCONTRADAS: "No se encontraron entidades.",
    INSERCION_EXITOSA: "Entidad insertada con éxito. ID: ",
    INSERCION_FALLIDA: "No se pudo insertar la entidad con ID: ",
    ACTUALIZACION_EXITOSA: "Entidad actualizada con éxito. ID: ",
    ACTUALIZACION_FALLIDA: "No se pudo actualizar la entidad con ID: ",
    ELIMINACION_EXITOSA: "Entidad eliminada con éxito. ID: ",
    ELIMINACION_FALLIDA: "No se pudo eliminar la entidad con ID: ",
    ERROR_INESPERADO: "Error inesperado en el servidor."
};

module.exports = constants;
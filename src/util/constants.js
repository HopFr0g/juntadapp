module.exports = {
    // Parámetros:
    DIMENSION_HASH: 32,
    MAX_CARACTERES_REUNION_NOMBRE: 64,
    MAX_CARACTERES_REUNION_DESCRIPCION: 128,
    MAX_CARACTERES_PERSONA_NOMBRE: 32,
    MIN_PERSONAS_PARA_COINCIDIR: 2,
    
    // Mensajes (Create)
    CREACION_EXITOSA: "Entidad creada con éxito: ",
    CREACION_FALLIDA: "No se pudo crear la entidad: ",
    
    // Mensajes (Read):
    ENTIDAD_ENCONTRADA: "Entidad obtenida con éxito: ",
    ENTIDAD_NO_ENCONTRADA: "No se encontró la entidad: ",
    ENTIDADES_ENCONTRADAS: "Entidades obtenidas con éxito.",
    ENTIDADES_NO_ENCONTRADAS: "No se encontraron entidades.",
    
    // Mensajes (Update)
    ACTUALIZACION_EXITOSA: "Entidad actualizada con éxito: ",
    ACTUALIZACION_FALLIDA: "No se pudo actualizar la entidad: ",
    
    // Mensajes (Delete)
    ELIMINACION_EXITOSA: "Entidad eliminada con éxito: ",
    ELIMINACION_FALLIDA: "No se pudo eliminar la entidad: ",
    
    // Mensajes (Resultados de validaciones):
    VALIDACION_NO_NULO_NO_VACIO: "El campo es obligatorio y no puede estar vacío.",
    VALIDACION_MAX_CARACTERES: "Cantidad máxima de caracteres: ",
    VALIDACION_MIN_CARACTERES: "Cantidad mínima de caracteres: ",
    VALIDACION_MAX_ELEMENTOS: "Cantidad máxima de elementos: ",
    VALIDACION_MIN_ELEMENTOS: "Cantidad mínima de elementos: ",
    VALIDACION_TEXTO: "Debe ser una cadena de texto.",
    VALIDACION_EMAIL: "Debe ser una dirección de correo electrónico",
    VALIDACION_ENTERO: "Debe ser un número entero.",
    VALIDACION_ARRAY_ENTEROS: "Debe ser un arreglo de números enteros.",
    VALIDACION_OBJETO: "Debe ser un objeto.",
    VALIDACION_ARRAY_OBJETO: "Debe ser un arreglo de objetos.",
    
    // Mensajes (Otros):
    ERROR_INESPERADO: "Error inesperado en el servidor."
};
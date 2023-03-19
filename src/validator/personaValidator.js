const {body} = require("express-validator/check");

const validator = require("../middlewares/validator.js");

const constants = require("../util/constants.js");

const create = [
    body("reunionHash", constants.VALIDACION_NO_NULO_NO_VACIO).exists().not().isEmpty(),
    
    body("nombre", constants.VALIDACION_NO_NULO_NO_VACIO).exists().not().isEmpty(),
    body("nombre", constants.VALIDACION_TEXTO).isString(),
    body("nombre", constants.VALIDACION_MAX_CARACTERES + constants.MAX_CARACTERES_PERSONA_NOMBRE).isLength({max: constants.MAX_CARACTERES_PERSONA_NOMBRE}),
    
    body("meses", constants.VALIDACION_NO_NULO_NO_VACIO).exists().not().isEmpty(),
    body("meses", constants.VALIDACION_ARRAY_OBJETO).isArray(),
    
    body("meses.*.idMes", constants.VALIDACION_NO_NULO_NO_VACIO).exists(),
    body("meses.*.idMes", constants.VALIDACION_ENTERO).isInt(),
    
    body("meses.*.dias", constants.VALIDACION_NO_NULO_NO_VACIO).exists().not().isEmpty(),
    body("meses.*.dias", constants.VALIDACION_ARRAY_ENTEROS).isArray(),
    body("meses.*.dias.*", constants.VALIDACION_ENTERO).isInt(),
    
    validator.validate
];

module.exports = {
    create
};
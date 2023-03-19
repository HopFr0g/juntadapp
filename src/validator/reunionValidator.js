const {body} = require("express-validator/check");

const validator = require("../middlewares/validator.js");

const constants = require("../util/constants.js");

const create = [
    body("nombre", constants.VALIDACION_NO_NULO_NO_VACIO).exists().not().isEmpty(),
    body("nombre", constants.VALIDACION_TEXTO).isString(),
    body("nombre", constants.VALIDACION_MAX_CARACTERES + constants.MAX_CARACTERES_REUNION_NOMBRE).isLength({max: constants.MAX_CARACTERES_REUNION_NOMBRE}),
    
    body("descripcion", constants.VALIDACION_MAX_CARACTERES + constants.MAX_CARACTERES_REUNION_DESCRIPCION).isLength({max: constants.MAX_CARACTERES_REUNION_DESCRIPCION}),
    
    body("idMeses", constants.VALIDACION_NO_NULO_NO_VACIO).exists().not().isEmpty(),
    body("idMeses", constants.VALIDACION_ARRAY_ENTEROS).isArray(),
    body("idMeses.*", constants.VALIDACION_ENTERO).isInt(),
    
    validator.validate
];

module.exports = {
    create
};